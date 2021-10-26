import passport from 'passport';
import passportLocal, { IVerifyOptions, VerifyFunction, VerifyFunctionWithRequest } from 'passport-local';
import { UserModel } from '../models/userModels';



const localStrategy = passportLocal.Strategy;

const strategyOptions = {
    username: "username",
    password: "password",
    passReqToCallback: true,
};

const loginFunction = async (req, username, password, done) => {
    const user = await UserModel.findOne({ username });
    if(!user){
        return done(null, false, { message: 'Non existing user' });
    }
    if(!(await user.isValidPassword(password))){
        return done(null, false, { message: 'Invalid password' });
    }
    console.log('Everything working fine');
    return done(null, user);
};

const signUpFunction = async (req, username, password, done) => {
    try{
        const { username, password, email } = req.body;
        console.log(req.body);
        if(!username || !password || !email ){
            console.log('Invalid fields');
            return done(null, false);
        }

        const query = {
            $or: [{ username: username }, { email: email }],
        };

        if(user){
            console.log("already exists");
            console.log(user);
            return done (null, false);
        }else{
            const userData = {
                username, 
                password,
                email,
            };

            const newUser = new UserModel(userData);

            await newUser.save();

            return done(null, newUser);
        }
    }catch (error){
        done(error);
    }
};

passport.use('login', new localStrategy(strategyOptions, loginFunction));
/* passport.use('signup', new localStrategy(strategyOptions, signUpFunction)); */

export const logIn = (req, res, done) => {
    if(!req.user) return res.status(401).json({ message: 'Not authorized' });

    done(null, req.user);
};

const User = {
    _id: "",
};

passport.serializeUser((User, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    UserModel.findById(userId, function (err, user){
        done(err, user);
    });
});

export default passport;