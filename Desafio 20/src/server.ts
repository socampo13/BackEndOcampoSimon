import express, { Request, Response } from "express";
import { Product } from "./product.js";
import { Cart } from "./cart.js";
import path from "path";
import * as socketIo from "socket.io";


const mongoose = require("mongoose");
const model = require("./mongoDB/schema");
const PORT = 8080;
const app = express();
const routerProducts = express.Router();
const routerCart = express.Router();
const __dirname = path.resolve();
const product: Product = new Product();
const cart: Cart = new Cart();
const admin: boolean = true;

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
server.on("error", (error: any) => {
    console.log(error);
});

app.use("/products", routerProducts);
app.use("/cart", routerCart);

const io = new socketIo.Server(server);
app.get("/", (request: Request, response: Response) => {
    response.sendFile(`${__dirname}/´src/public/index.html`);
});

app.get("/cart", (request: Request, response: Response) => {
    response.sendFile(`${__dirname}/src/public/html/cart.html`);
});

interface Message {
    author: string;
    date: string;
    text: string;
}

const messages: Array<Message> = [
    {
        author: " ",
        date: " ",
        text: " ",
    },
];

io.on("connection", (socket: any) => {
    const productsTemplate = product.getArray();
    socket.emit("loadProduct", productsTemplate);
    console.log("Connected");

    const cartTemplate = cart.getCart();
    socket.emit("addToCart", cartTemplate);
    console.log("Connected");

    socket.emit("messages", messages);

    socket.on("new-message", (data: any) => {
        messages.push(data);
        io.sockets.emit("messages", messages);
        saveMessages(data);
    });
});

const saveMessages = (data: any) => {
    mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
        console.log("Database connected");
        model.messages.insertMany(data, (error: any, docs: any) => {
            if(error) {
                throw new Error();
            }
            console.log(docs);
            mongoose.disconnect(() => {
                console.log("Database disconnected");
            });
        });
    });
};

////// ROUTES ////////

//List Products
routerProducts.get("/list", (request: Request, response: Response) => {
    const result = product.getArray();
    if(result.length > 0) {
        response.status(200).send(JSON.stringify(result));
    } else {
        response.status(404).send({error: "No loaded products"});
    }
});

//Products by ID
routerProducts.get("list/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    const result = product.getElementById(id);
    if(result == null) {
        response.status(404).send("Product not found");
    }
    response.status(200).send(JSON.stringify(result));
});

//Add product
routerProducts.post("/save", (request: Request, response: Response) => {
    if(admin){
        const product = request.body;
        const productsTemplate = product.getArray();
        product.addElement(product);
        io.sockets.emit("loadProduct", productsTemplate);
        response.redirect("/");
    } else {
        response.send({Error: -1, Description: "Route not authorized"});
    }
});

//Update product
routerProducts.put("/update/:id", (request: Request, response: Response) => {
    const date = new Date();
    const dateTemplate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    if(admin) {
        let id = request.params.id;
        const productBody = request.body;
        const newProduct = { ...productBody, id, dateTemplate};
        product.updateObject(newProduct, id);
        response.send(newProduct);
    } else {
        response.send({Error: -1, Description: "Route not authorized"});
    }
});

//Delete by Id
routerProducts.delete("/delete/:id", (request: Request, response: Response) => {
    const deletedObject = product.getElementById(request.params.id);
    product.deleteObject(request.params.id);
    response.status(200).send(deletedObject);
});

/////// CART ROUTES ////////

//List
routerCart.get("/", (request: Request, response: Response) => {
    const result = cart.getCart();
    if(result.length > 0){
        response.status(200).send(JSON.stringify(result));
    } else {
        response.status(404).send({error: "No products loaded in cart"});
    }
});

//Products by Id in cart
routerCart.get("/list/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    const result = cart.getElementByIdCart(id);
    if(result == null){
        response.status(404).send("Product not found");
    }
    response.status(200).send(JSON.stringify(result));
});

//Add product in cart
routerCart.post("/save/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    const productId = product.getElementById(id);
    console.log(productId);
    
    const products = cart.addElementToCart(productId);
    io.sockets.emit("addCart", products);
    response.redirect("/cart/list");
});

//Delete product in cart
routerCart.delete("/delete/:id", (request: Request, response: Response) => {
    const deletedObject = product.getElementById(request.params.id);
    product.deleteObject(request.params.id);
    response.status(200).send(deletedObject);
});