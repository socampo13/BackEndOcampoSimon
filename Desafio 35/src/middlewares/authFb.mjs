import passport from 'passport';
import { UserModel } from '../models/userModels.mjs';
import { VerifyFunction, StrategyOption, Strategy as FacebookStrategy } from 'passport-facebook';

const strategyOptions = {
    clientID: "415731670126501",
    clientSecret: "4c11d413e019259b215c89dbe2c7788d",
    callbackURL: "http://localhost:8080/api/auth/facebook/callback",
    profileFields: ["id", "displayName", "photos", "email"],
};

const loginFunct = async(
    accessToken,
    refreshToken,
    profile,
    done
) => {
    console.log("Everything ok");
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile)
    return done(null, profile);
};

passport.use(new FacebookStrategy(strategyOptions, loginFunct));

export const isLoggedIn = (req, res, done) => {
    if(!req.user) 
    return res.status(401).json({ message: "Not authorized" });
    done (null, req.user);
};

passport.serializeUser(function(user, callback){
    callback(null, user);
});

passport.deserializeUser(function (object, callback){
    callback(null, object);
});

export default passport;