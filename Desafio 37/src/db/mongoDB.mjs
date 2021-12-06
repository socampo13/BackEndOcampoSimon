import mongoose from 'mongoose';

export async function dbConnection(){
    try{
        const URLhost = 'mongodb://localhost:27017/makeithappen';
        let connection = await mongoose.connect(URLhost);
        console.log('Connected to MongoDB');
    }catch (error){
        console.log(error);
    }
};