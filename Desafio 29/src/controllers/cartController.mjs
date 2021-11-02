import express from 'express';

 class CartController{
    checkProductExist(req, res, next){
        const idProduct = Number(req.params.id);
        next();
    }
    getProducts(req, res){
        const idProduct = Number(req.params.id);
        res.json({});
    }
    addProductsCartId(req, res){
        const idProduct = Number(req.params.id);
        res.json({
            message: 'Product added succesfully'
        });
    }
    deleteProductCart(req, res){
        const idProduct = Number(req.params.id);
        res.json({
            message: 'Product deleted succesfully'
        });
    }
};

export const cartController = new CartController();