import passport from 'passport';
import {VerifyFunction, strategyOption, Strategy as FacebookStrategy} from '´passport-facebook';
import { UserModel } from '../models/userModels';
import { fbClientIdArgument, fbClientSecretArgument } from '../utilities/getArgs.mjs';
import Config from '../config/index';




const strategyOptions = {
    clientID: fbClientIdArgument || Config.FACEBOOK_APP_ID,
    clientSecret: fbClientSecretArgument || Config.FACEBOOK_APP_SECRET,
    callbackURL: "https://curso-back-ocampo.herokuapp.com/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'first_name', 'last_name', 'middle_name', 'picture.type(large)'],
};

const loginFunction, VerifyFunction = async (
    accessToken,
    refreshToken,
    profile,
    done
) => {
    console.log("All process ok");
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return done(null, profile);
};


passport.use(new FacebookStrategy(strategyOptions, loginFunction));

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