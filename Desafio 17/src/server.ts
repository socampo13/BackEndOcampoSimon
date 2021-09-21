import express, { request, Request, response, Response } from 'express';
import { Memoria } from './memoria';
import { ShoppingCart } from './shoppingCart';
import http from 'http';
import path from 'path';
import handlebars from 'express-handlebars';
import * as SocketIO from 'socket.io';

const PORT = 8080 || process.env.PORT;
const app = express();
const router = express.Router();
const routerCart = express.Router();
const __dirname = path.resolve();
const memoria = new Memoria();
const shoppingCart = new ShoppingCart();
const server = http.createServer(app);
const ioServer = new SocketIO.Server(server);
const isAdmin: boolean = true;

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/productos', router);
app.use('/shoppingCart', routerCart);
app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/pages'
    })
);

server.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});
server.on('error', error => {
    console.log(error);
});

//////////ROUTAS///////
app.get('productos/vista', (request: Request, response: Response) => {
    response.render('pages/index.hbs', {productos: memoria.getArray() });
});

app.get('/productos/listar', (request: Request, response: Response) => {
    const result = memoria.getArray();
    if(result.length > 0) {
        response.status(200).send(JSON.stringify(result));
    } else {
        response.status(404).send({error: 'No productos loaded'});
    }
});

app.get('/productos/listar/:id', (request: Request, response: Response) => {
    const parametersId = parseInt(request.params.id);
    const result = memoria.getElementById(parametersId);
    if(result == null){
        response.status(404).send('Product not found');
    }
    response.status(200).send(JSON.stringify(result));
});

app.post('/agregar', (request: Request, response: Response) => {
    if(isAdmin){
        const product = request.body;
        if(product.name && product.description && product.code){
            memoria.addElement(product);
            ioServer.sockets.emit('loadProducts', memoria.getArray());
            response.redirect('/');
        } else {
            response.status(400).send({error: 'Incomplete information'});
        }
    } else {
        response.send({
            error: -1,
            description: `route '/agregar' not authorized`,
        });
    }
});

app.put('/productos/actualizar/:id', (request: Request, response: Response) => {
    if(isAdmin){
        const parametersId = parseInt(request.params.id);
        const newProduct = request.body;
        memoria.updateObject(newProduct, parametersId);
        response.send(newProduct);
    } else {
        response.send({error: -1, description: `route '/productos/actualizar/:id' not authorized`});
    }
});

app.delete('/productos/borrar/:id', (request: Request, response: Response) => {
    if(isAdmin){
        const parametersId = parseInt(request.params.id_producto);
        const deleteObject = memoria.getElementById(parametersId);
        memoria.deleteObject(parametersId);
    } else {
        response.send({error: -1, description:`route '/productos/borrar/:id' not authorized`});
    }
});

routerCart.post('/listar', (request: Request, response: Response) => {
    const idQuery: number = Number(request.query.id);
    if(!isNaN(idQuery)){
        const producto = shoppingCart.getProductoById(idQuery);
        response.send({productInCart: producto});
    } else {
        const products = shoppingCart.getProducts();
        response.send({
            CartId: shoppingCart.getId(),
            timestampCart: shoppingCart.getTimestamp(),
            ProductsInCart: products,
        });
    }
});

routerCart.post('/agregar/:id_producto', (request: Request, response: Response) => {
    const parametersId = parseInt(request.params.id_producto);
    const producto: any = memoria.getElementById(parametersId);
    shoppingCart.addProducto(producto);
    response.redirect('/');
});

routerCart.delete('/borrar/:id', (request: Request, response: Response) => {
    const parametersId = parseInt(request.params.id);
    const deleteObject = shoppingCart.getProductoById(parametersId);
    shoppingCart.deleteProducto(parametersId);
    response.status(200).send(deleteObject);
});

interface Message {
    author: string;
    text: string;
}

const messages: Array<Message> = [];
ioServer.on('connection', socket => {
    console.log('New client online');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data);
        ioServer.sockets.emit('messages', messages);
    });
});
