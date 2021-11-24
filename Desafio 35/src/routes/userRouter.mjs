import { Router } from "express";
import { UserModel } from '../models/userModels';
import passport from '../middlewares/auth';

const router = Router();

router.get("/", async (req, res) => {
    res.render("loginForm");
});

router.post("/signup", (req, res, next) => {
    passport.authenticate("signup", function(err, user, info) {
        console.log(err, user, info);
        if(err){
            return next(err);
        }
        if(!user) return res.status(401).json({ data: info });

        res.render("main", { username: req.body.username });
    })(req, res, next);
});

router.get("signup", (req, res) => {
    res.render("signup")
});

router.post("/login", passport.authenticate("login"),
(req, res) => {
    res.render("main", { username: req.body.username });
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/api");
    });
});

router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] })
);

router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/api/main",
    failureRedirect: "/api/login",
    })
);

export default router;