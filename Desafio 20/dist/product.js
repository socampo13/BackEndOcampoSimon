"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose = require("mongoose");
var model = require("./mongoDB/schema");
var Product = /** @class */ (function () {
    function Product() {
        this.array = [];
        this.count = 0;
    }
    Product.prototype.getArray = function () {
        return this.array;
    };
    Product.prototype.getElementById = function (id) {
        var result = this.array.find(function (element) { return element.id === Number(id); });
        mongoose.connect("mongodb://localhost:27017/ecommerce", function () {
            console.log("Database connected");
            model.products.find({ id: id }, function (error, docs) {
                if (error) {
                    throw new Error();
                }
                console.log(docs);
                mongoose.disconnect(function () {
                    console.log("Database disconnected");
                });
            });
        });
        return result;
    };
    Product.prototype.addElement = function (product) {
        var date = new Date();
        var dateTemplate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " ";
        this.array.push(__assign(__assign({}, product), { id: this.count + 1, dateTemplate: dateTemplate }));
        this.count++;
        var saveProduct = __assign(__assign({}, product), { id: this.count, dateTemplate: dateTemplate });
        mongoose.connect("mongodb://localhost:27017/ecommerce", function () {
            console.log("Database connected");
            model.products.insertMany(saveProduct, function (error, docs) {
                if (error) {
                    throw new Error();
                }
                console.log(docs);
                mongoose.disconnect(function () {
                    console.log("Database disconnected");
                });
            });
        });
        return product;
    };
    Product.prototype.updateObject = function (newProduct, id) {
        var index = this.array.findIndex(function (element) { return element.id === Number(id); });
        this.array[index] = newProduct;
        mongoose.connect("mongodb://localhost:27017/ecommerce", function () {
            console.log("Database connected");
            model.products.update({ id: id }, {
                $set: {
                    id: newProduct.id,
                    templateDate: newProduct.templateDate,
                    title: newProduct.title,
                    description: newProduct.description,
                    code: newProduct.code,
                    price: newProduct.price,
                    stock: newProduct.stock,
                    thumbnail: newProduct.thumbnail,
                },
            }, function (error, docs) {
                if (error) {
                    throw new Error();
                }
                console.log(docs);
                mongoose.disconnect(function () {
                    console.log("Database disconnected");
                });
            });
        });
    };
    Product.prototype.deleteObject = function (id) {
        var index = this.array.findIndex(function (element) { return element.id === Number(id); });
        this.array.splice(index, 1);
        mongoose.connect("mongodb://localhost:27017/ecommerce", function () {
            console.log("Database connected");
            model.products.deleteOne({ id: id }, function (error, docs) {
                if (error) {
                    throw new Error();
                }
                console.log(docs);
                mongoose.disconnect(function () {
                    console.log("Database disconnected");
                });
            });
        });
    };
    return Product;
}());
exports.Product = Product;
