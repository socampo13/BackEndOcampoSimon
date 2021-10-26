import { request, response, nextFunction } from "express";

const admin = true;

export const checkAdmin = (req, res, next) => {
    console.log('Middleware on');
    if(admin) next();
    else{
        res.status(401).json({
            message: 'Not authorized',
        });
    }
};