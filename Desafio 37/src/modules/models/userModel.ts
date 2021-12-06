import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { NewUserI, UserI, UserBaseClass, UserQuery} from '../interface/userInterface';
import config from '../config/index';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
});

userSchema.pre('save', async function (next){
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
});

export class UserBox implements UserBaseClass{
    private users;

    constructor(){
        this.users = mongoose.model<UserI>('user', userSchema);
    }

    async get(id?: string): Promise<UserI[]>{
        let output: UserI[] = [];
        try{
            if(id){
                const document = await this.users.findById(id);
                if(document) output.push(document);
            } else {
                output = await this.users.find().lean();
            }
            return output;
        } catch (err){
            return output;
        }
    }

    async add(data: NewUserI): Promise<UserI>{
        const newProduct = new this.users(data);
        await newProduct.save();

        return newProduct;
    }

    async update(id: string, data: NewUserI): Promise<UserI>{
        const userUpdate = this.users.findByIdAndUpdate(id, data);

        return userUpdate as unknown as Promise<UserI>;
    }

    async delete(id: string): Promise<UserI>{
        await this.users.findByIdAndDelete(id);
    }

    async query(query : any): Promise<UserI>{
        const result = await this.users.find(query);
        return result[0];
    }

    async validateUserPassword(
        username: string,
        password: string
    ) : Promise<boolean>{
        const user = await this.users.findOne({username});
        if(!user) return false;
        const passwordIsValid = await bcrypt.compare(password, user.password);
        return passwordIsValid;
    }
};