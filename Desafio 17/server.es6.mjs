import express, { request, response } from 'express';
import { Memoria } from './memoria.es6.mjs';
import path from 'path';
import handlebars from 'express-handlebars';
import * as SocketIO from 'socket.io';
import http from 'http';

const PORT = 8080;
const app = express();
const router = express.Router();
const __dirname = path.resolve();
const memoria = new Memoria();
const server = http.Server(app);
const ioServer = new SocketIO.Server(server);



app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.set('views', './views');
app.set('view engine', 'hbs');
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/pages',
        partialsDir: __dirname + '/views/partials',
    })
);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
server.on('error', error => {
    console.log(error);
});
///////////////////////////////////////////////  Rutas de las paginas  ////////////////////////////////////
app.get('productos/vista', (request, response) => {
    response.render('pages/index.hbs', { productos: memoria.getArray() });
});

app.get('/productos/listar', (request, response) => {
    const result = memoria.getArray();
    if(result.length > 0) {
        response.status(200).send(JSON.stringify(result));
    } else {
        response.status(404).send({error: 'No productos loaded'});
    }
});

app.get('/productos/listar/:id', (request, response) => {
    const {id} = request.params;
    const result = memoria.getElementById(id);
    if(result == null){
        response.status(404).send('Product not found');
    }
    response.status(200).send(JSON.stringify(result));
});

app.post('/productos/guardar', (request, response) => {
    const product = request.body;
    if(product.price && product.title && product.thumbnail){
        memoria.addElement(product);
        ioServer.sockets.emit('loadProducts', memoria.getArray());
        response.redirect('/');
    } else {
        response.status(400).send({error: 'Incomplete information'});
    }
});

app.put('/productos/actualizar/:id', (request, response) => {
    let id = request.params.id;
    const newProduct = request.body;
    memoria.updateObject(newProduct, id);
    response.send(newProduct);
});

app.delete('/productos/borrar/:id', (request, response) => {
    const deleteObject = memoria.getElementById(request.params.id);
    memoria.deleteObject(request.params.id);
    response.status(200).send(deleteObject);
});

////////////////  WEB SOCKETS //////////////
ioServer.on('connection', socket => {
    socket.emit('loadProducts', memoria.getArray());
    console.log('Connection succesful');
});

const messages = [];
ioServer.on('connection', socket => {
    console.log('New client online');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data);
        ioServer.sockets.emit('messages', messages);
    });
});