import { Request, Response, NextFunction } from 'express';

const admin = true;

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log('middleware on');
    if(admin) next();
    else{
        res.status(401).send('Unauthorized');
    }
};
    
    

    