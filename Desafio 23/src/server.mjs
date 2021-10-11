import { DaoFactory } from './factory.mjs';
import { IDao } from './interface/daos/IDao.mjs';
import express, { response } from 'express';
import path from 'path';
import faker from 'faker';
import * as socketIo from 'socket.io';

const admin = true;
const port = 8080;
const app = express();
const routerProducts = express.Router();
const routerCart = express.Router();
const __dirname = path.resolve();
faker.locale = "es";

app.unsubscribe(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
server.on("error", (error) =>{
    console.log(error);
});
app.use("/productos", routerProducts);
app.use("/carrito", routerCart);

//Selección Dao
const FileSystemDao = 1;
const MySqlDao = 2;
const SqlDao = 3;
const MongoDbDao = 4;
const MongoDbaaSDao = 5;
const FirebaseDao = 6;

const daoFactory = new DaoFactory();
const dao = daoFactory.getDao(FileSystemDao);


// Web socket
const io = new socketIo.Server(server);

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/src/public/index.html`)
});
app.get("/carrito", (req, res) => {
    res.sendFile(`${__dirname}/src/public/html/cart.html`);
});

const message = [
    {
        author: " ",
        date: " ",
        text: " ",
    },
];

io.on ("connection", (socket) => {
    const productsTemplate = dao.getProducts();

    socket.emit("loadProduct", productsTemplate);
    console.log("Online");

    const cartTemplate = dao.getProducts();

    socket.emit("addToCart", cartTemplate);
    console.log("Online");

    socket.emit("messages", messages);

    socket.on("new-message", (data) => {
        messages.push(data);
        io.sockets.emit("messages", messages);
    });
    
});

//Router products faker.js

routerProducts.get("productos/vista-test", (req, res) => {
    const array = [];
    const quantity = Number(req.query.quantity);
    const generateQuantity = isNaN(quantity) ? 10 : quantity;

    for(let index = 0; index < generateQuantity; index++){
        array.push({
            id: ++id,
            title: faker.commerce.product(),
            descripcion: faker.commerce.productDescription(),
            codigo: faker.datatype.number(),
            precio: faker.commerce.price(),
            stock: faker.datatype.number(),
            thumbnail: faker.internet.url(),
        });
    }

    response.json(array);
});


//Router products

//Product list
routerProducts.get("/listar", (req, res) => {
    const result = dao.getProducts();

    if(result !== undefined){
        res.status(200).send(JSON.stringify(result));
    }else{
        res.status(404).send({ error: "No products loaded" });
    }
});

//Id products list
routerProducts.get("/listar/:id", (req, res) => {
    const { id } = req.params;
    const result = dao.getProductById(Number(id));

    if(result == null){
        res.status(404).send("Product not found");
    }else{
        res.status(200).send(JSON.stringify(result));
    }
});

//Add product
routerProducts.post("/guardar", (req, res) => {
    if(admin){
        const product = req.body;
        const productsTemplate = dao.getProducts();
        dao.inertProduct(product);
        io.sockets.emit("loadProducts", productsTemplate);
        res.redirect("/");
    }else{
        res.send({ Error: -1, Description: "Not authorized"});
    }
});

//Update product
routerProducts.put("/update/:id", (req, res) => {
    const date = new Date();
    const dateTemplate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes}:${date.getSeconds}`;

    if(admin){
        const id = req.params.id;
        const productBody = req.body;
        const newProduct = { ...productBody, id, dateTemplate};
        dao.updateProduct(productBody, Number(id));
        res.send(newProduct);
    }else{
        res.send({ Error: -1, Description: "Not authorized"});
    }

});

routerProducts.delete("/borrar/:id", (req, res) => {
    
    if(admin){
        const index = req.params.id;
        const deletesObject = dao.getProductById(Number(index));
        dao.deleteProduct(Number(index));

    }else{
        res.send({ Error: -1, Description: "Not authorized"});
    }
});

//CART ROUTES

routerCart.get("/listar", (req, res) => {
    const result = dao.getProducts();
    if(result !== undefined){
        res.status(200).send(JSON.stringify(result));
    }else{
        res.status(404).send({ Error: "No loaded products" });
    }
});

routerCart.post("/listar/:id", (req, res) => {
    const { id } = req.params;
    const result = dao.getProductById(Number(id));
    if(result == null){
        res.status(404).send("Product not found");
    }else{
        res.status(200).send(JSON.stringify(result));
    }
});

routerCart.post("/guardar", (req, res) => {
    if(admin){
        const product = req.body;
        const productsTemplate = dao.getProducts();
        dao.insertProduct(product);
        io.sockets.emit("loadProducts", productsTemplate);
        res.redirect("/");
    }else{
        res.send({ Error: -1, Description: "Not authorized" });
    }
});

routerCart.put("/actualiar/:id", (req, res) => {
    const date = new Date();
    const dateTemplate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes}:${date.getSeconds}`;

    if(admin){
        const id = req.params.id;
        const productBody = req.body;
        const newProduct = { ...productBody, id, dateTemplate};
        dao.updateProduct(productBody, Number(id));
        res.send(newProduct);
    }else{
        res.send({ Error: -1, Description: "Not authorized" });
    }
});

routerCart.delete("/borrar/:id", (req, res) => {
    const index = req.params.id;

    const deletesObject = dao.getProductById(Number(index));
    dao.deleteProduct(Number(index));

    res.status(200).send(deletesObject);
});
