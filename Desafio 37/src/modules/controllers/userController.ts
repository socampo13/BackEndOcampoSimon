import { Request, Response, NextFunction } from 'express';
import { UserAPI } from '../api/userAPI';
import { userJoinSchema } from '../interface/userInterface';

class User{
    async validateUserInput(req: Request, res: Response, next: NextFunction){
        try{
            await userJoinSchema.validateAsync(req.body);
            const { username, email } = req.body;
            const user = await UserAPI.query(username, email);
            if(!user) next();
            else res.status(400).json({message: 'User already exists'});
        }catch(err){
            if(err instanceof Error) res.status(400).json({message: err.message});
        }
    }

    async getUsers(req: Request, res: Response) {
        const data = await UserAPI.getUsers(req.params.id);
        res.json({ msg: 'GET USERS', data });
      }
    
      async addUser(req: Request, res: Response) {
        const newItem = await UserAPI.addUser(req.body);
        res.json({ msg: 'ADD USER', newItem });
      }
    
      async updateUser(req: Request, res: Response) {
        const { id, data } = req.body
        const updatedUser = await UserAPI.updateUser(id,data);
        res.json({ msg: 'UPDATE USER' });
      }
    
      async deleteUser(req: Request, res: Response) {
        const { id } = req.body
        await UserAPI.deleteUser(id);
        res.json({ msg: 'DELETE USER' });
      }
};

export const UserController = new User();