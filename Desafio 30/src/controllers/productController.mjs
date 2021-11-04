import { products } from '../models/productsModels.mjs';
import express from 'express';

const tableName = 'products';

class ProductController{
    checkAddProduct(err, req, res, next){
        const { name, price, description, thumbnail, stock } = req.body;
        if(!name || !price || !description || !thumbnail || !stock)
        return res.status(400).json({
            message: 'invalid fields',
            error: err
        });
    }
    next();

    async checkProductsExist (req, res, next){
        const {id} = req.params;
        products.findById(id, (err, product) => {
            if(err){
                return res.status(404).json({
                    message: 'Product not found'
                });
            }else{
                next();
            }
        })
    }

    async getProducts(req, res){
        const total = await products.find().lean();
        res.render('main', { products: total });
    };

    async addProduct(req, res){
        console.log(req.body);
        await products.create(req.body);
        res.redirect("/api/productos");
    }
    
    async updateProduct(req, res){
        const {id} = req.params;
        await products.findByIdAndUpdate(id, req.body);
        res.json({
            message: 'Product deleted with success'
        });
    }
}

export const productController = new ProductController();
