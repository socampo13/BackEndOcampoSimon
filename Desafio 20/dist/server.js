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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_js_1 = require("./product.js");
var cart_js_1 = require("./cart.js");
var path_1 = __importDefault(require("path"));
var socketIo = __importStar(require("socket.io"));
var mongoose = require("mongoose");
var model = require("./mongoDB/schema");
var PORT = 8080;
var app = (0, express_1.default)();
var routerProducts = express_1.default.Router();
var routerCart = express_1.default.Router();
var __dirname = path_1.default.resolve();
var product = new product_js_1.Product();
var cart = new cart_js_1.Cart();
var admin = true;
app.use(express_1.default.static(__dirname + "/src/public"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
var server = app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
server.on("error", function (error) {
    console.log(error);
});
app.use("/products", routerProducts);
app.use("/cart", routerCart);
var io = new socketIo.Server(server);
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/\u00B4src/public/index.html");
});
app.get("/cart", function (request, response) {
    response.sendFile(__dirname + "/src/public/html/cart.html");
});
var messages = [
    {
        author: " ",
        date: " ",
        text: " ",
    },
];
io.on("connection", function (socket) {
    var productsTemplate = product.getArray();
    socket.emit("loadProduct", productsTemplate);
    console.log("Connected");
    var cartTemplate = cart.getCart();
    socket.emit("addToCart", cartTemplate);
    console.log("Connected");
    socket.emit("messages", messages);
    socket.on("new-message", function (data) {
        messages.push(data);
        io.sockets.emit("messages", messages);
        saveMessages(data);
    });
});
var saveMessages = function (data) {
    mongoose.connect("mongodb://localhost:27017/ecommerce").then(function () {
        console.log("Database connected");
        model.messages.insertMany(data, function (error, docs) {
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
////// ROUTES ////////
//List Products
routerProducts.get("/list", function (request, response) {
    var result = product.getArray();
    if (result.length > 0) {
        response.status(200).send(JSON.stringify(result));
    }
    else {
        response.status(404).send({ error: "No loaded products" });
    }
});
//Products by ID
routerProducts.get("list/:id", function (request, response) {
    var id = request.params.id;
    var result = product.getElementById(id);
    if (result == null) {
        response.status(404).send("Product not found");
    }
    response.status(200).send(JSON.stringify(result));
});
//Add product
routerProducts.post("/save", function (request, response) {
    if (admin) {
        var product_1 = request.body;
        var productsTemplate = product_1.getArray();
        product_1.addElement(product_1);
        io.sockets.emit("loadProduct", productsTemplate);
        response.redirect("/");
    }
    else {
        response.send({ Error: -1, Description: "Route not authorized" });
    }
});
//Update product
routerProducts.put("/update/:id", function (request, response) {
    var date = new Date();
    var dateTemplate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    if (admin) {
        var id = request.params.id;
        var productBody = request.body;
        var newProduct = __assign(__assign({}, productBody), { id: id, dateTemplate: dateTemplate });
        product.updateObject(newProduct, id);
        response.send(newProduct);
    }
    else {
        response.send({ Error: -1, Description: "Route not authorized" });
    }
});
//Delete by Id
routerProducts.delete("/delete/:id", function (request, response) {
    var deletedObject = product.getElementById(request.params.id);
    product.deleteObject(request.params.id);
    response.status(200).send(deletedObject);
});
/////// CART ROUTES ////////
//List
routerCart.get("/", function (request, response) {
    var result = cart.getCart();
    if (result.length > 0) {
        response.status(200).send(JSON.stringify(result));
    }
    else {
        response.status(404).send({ error: "No products loaded in cart" });
    }
});
//Products by Id in cart
routerCart.get("/list/:id", function (request, response) {
    var id = request.params.id;
    var result = cart.getElementByIdCart(id);
    if (result == null) {
        response.status(404).send("Product not found");
    }
    response.status(200).send(JSON.stringify(result));
});
//Add product in cart
routerCart.post("/save/:id", function (request, response) {
    var id = request.params.id;
    var productId = product.getElementById(id);
    console.log(productId);
    var products = cart.addElementToCart(productId);
    io.sockets.emit("addCart", products);
    response.redirect("/cart/list");
});
//Delete product in cart
routerCart.delete("/delete/:id", function (request, response) {
    var deletedObject = product.getElementById(request.params.id);
    product.deleteObject(request.params.id);
    response.status(200).send(deletedObject);
});
