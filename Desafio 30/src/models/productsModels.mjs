import mongoose from 'mongoose';

const productsCollection = 'products';

const ProductsSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 50},
    price: {type: Number, required: true},
    description: {type: String, required: true, max: 240},
    thumbnail: {type: String, required: true, max: 64},
    stock: {type: Number, required: true},
    timestamp: {type: Date, default: Date.now()}
});

export default products = mongoose.model(productsCollection, ProductsSchema);