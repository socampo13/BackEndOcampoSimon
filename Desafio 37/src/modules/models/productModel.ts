import mongoose from 'mongoose';
import { newProductI, ProductI, ProductBaseClass, ProductQuery } from '../interface/productsInterface';

const productCollection = 'products';
const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true, max : 50},
    price: {type : Number, required: true},
    description: {type: String, required: true, max : 280},
    thumbnail: {type: String, required: true},
    stock: {type: Number, required: true},
    timestamp: {type: Date, default: Date.now()}
});

class ProductBox implements ProductBaseClass {
    private products;
    constructor() {
        this.products = mongoose.model<ProductI>('product', ProductSchema);
    }

    async get(id?: string){
        try{
            if(id){
                const document = await this.products.findById(id).lean();
                if(document) return document;
            }else{
                return this.products.find({}).lean();
            }
        }catch (err){
            let mesg = (err as Error).message;
        }
    }

    async add(data: newProductI): Promise<ProductI>{
        if(!data.name || !data.price || !data.description || !data.thumbnail) throw new Error('Missing data');
        const newProduct = new this.products(data);
        await newProduct.save();
        return newProduct;
    }

    async update(id: string, newProductData: newProductI): Promise<ProductI>{
        const prodUpdate = this.products.findByIdAndUpdate(id, newProductData);
        return prodUpdate as unknown as Promise<ProductI>;
    }

    async delete(id: string){
        await this.products.findByIdAndDelete(id);
    }

    async query(options: ProductQuery): Promise<ProductI>{
        let query:ProductQuery = {};
        if(options.name) query.name = options.name;
        if(options.price) query.price = options.price;
        return this.products.find(query);
    }
}

export const productBox = new ProductBox();