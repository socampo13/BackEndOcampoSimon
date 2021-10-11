import mongoose from 'mongoose';

export class ProductSchema{
    constructor(){
        let productsSchema = new mongoose.Schema({
            id:{
                type: Number,
                require: true,
            },
            timestamp: {
                type: Date,
                require: true,
            },
            title: {
                type: String,
                require: true,
                max: 100,
            },
            description: {
                type: String,
                require: true,
                max: 100, 
            },
            code: {
                type: Number,
                require: true,
            },
            price: {
                type: Number,
                require: true,
            },
            stock: {
                type: Number,
                require: true,
            },
            thumbnail: {
                type: String,
                require: true,
                max: 100,
            },
        });
    }
}

/* const productsSchema = new mongoose.Schema({
    id:{
        type: Number,
        require: true,
    },
    timestamp: {
        type: Date,
        require: true,
    },
    title: {
        type: String,
        require: true,
        max: 100,
    },
    description: {
        type: String,
        require: true,
        max: 100, 
    },
    code: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    thumbnail: {
        type: String,
        require: true,
        max: 100,
    },
});

module.exports = {
    products: mongoose.model("products", productsSchema),
} */