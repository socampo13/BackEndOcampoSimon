import mongoose from "mongoose";

const productsCollection = "products";
const productsSchema = new mongoose.Schema({
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

const messagesCollection = "messages";
const messagesSchema = new mongoose.Schema({
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
    products: mongoose.model("products", productsSchema),
    messages: mongoose.model("messages", messagesSchema),
};