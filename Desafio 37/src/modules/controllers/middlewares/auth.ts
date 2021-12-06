import passport from 'passport';
import { Strategy, VerifyFunctionWithRequest, IStrategyOptionsWithRequest } from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { UserAPI } from '../api/userAPI';
import { userJoinSchema } from '../interface/userInterface';
import { logger } from './logger';
import { EmailService } from '../services/gmail';
import config from '../config/config';

const admin = true;

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    logger.info('middleware on');
    if (admin) next();
    else {
        res.status(401).send('Unauthorized');
    }
};

const logicFunction : VerifyFunctionWithRequest = async (
    req,
    username,
    password,
    done
) => {
    const user = await UserAPI.query(username);
    if(!user){
        logger.warn('user not found');
        return done(null, false, { message: 'Incorrect username.' });
    }
    const check = await UserAPI.ValidatePassword(username, password);
    if(!check){
        logger.warn('password not valid');
        return done(null, false, { message: 'Incorrect password.' });
    }
    const signUpFunction : VerifyFunctionWithRequest = async (
        req,
        username,
        password,
        done
    ) => {
        try{
            await userJoinSchema.validateAsync(req.body);
            const {email} = req.body;
            const user = await UserAPI.query(username, email);
            logger.info(user);
            if(user){
                logger.warn('user already exists');
                return done(null, false, { message: 'User already exists.' });
            }
        }finally{
            const newUser = await UserAPI.addUser(req.body);
            await EmailService.sendEmail(config.GMAIL_EMAIL, 'new user', req.body)
            return done(null, newUser);
        }
    }catch(err){
        if(err instanceof Error){
            logger.error(err.message);
            return done(null, {
                message: err.message
            });
        }
    }
};

passport.use('login', new Strategy(strategyOptions, logicFunction));
passport.use('signup', new Strategy(strategyOptions, signUpFunction));
passport.serializeUser((user:any, done) => {
    done(null, user._id);
});
passport.deserializeUser(async(userId: string, done) => {
    try{
        const result = await UserAPI.getUserById(userId);
        logger.warn(result);
        done(null, result[0]);
    }catch(err){
        done(err);
    }
});

export const LogIn = (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) return res.status(401).json({message: 'Unauthorized'});
    next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(!req.user) return res.status(401).json({message: 'Unauthorized'});
    next();

};

export default passport;