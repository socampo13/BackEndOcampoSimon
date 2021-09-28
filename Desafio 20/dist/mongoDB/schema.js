"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var productsCollection = "products";
var productsSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        require: true,
    },
    templateDate: {
        type: String,
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
        max: 200,
    },
});
var messagesCollection = "messages";
var messagesSchema = new mongoose_1.default.Schema({
    author: {
        type: String,
        require: true,
        max: 100,
    },
    date: {
        type: String,
        require: true,
        max: 200,
    },
    text: {
        type: String,
        requiere: true,
        max: 100,
    },
});
module.exports = {
    products: mongoose_1.default.model("products", productsSchema),
    messages: mongoose_1.default.model("messages", messagesSchema),
};
