import express, { request, response } from 'express';
import { Memoria } from './Memoria.mjs';
import path from 'path';

const express = require('express'), io = require('socket.io')(http);
const app = express();
const http = require('http').Server(app);
const Port = 8080;
const memoria = new Memoria();
const router = express.Router();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('${__dirname}/public'));
app.use('/api', router);
app.set("view engine", ejs);

http.listen(Port, () => {
    console.log("El servidor se está escuchando en el puerto 8080");
});

server.on('error', error => {
    console.log(error);
})

///////////////WEB SOCKET

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('Nuevo usuario','Usuario conectado')
})
socket.on('Nuevo usuario', data => {
    console.log(data);
});

//////////////////////////////////////////

app.get("/api/productos/listar", (request, response) => {
    const result = memoria.getArray();

    if(result.length > 0) {
        response.status(200).send(JSON.stringify(result))
    } else {
        result.status(404).send({error: "no hay productos cargados"})
    }

});

app.get("/api/productos/listar/:id", (request, response) => {

    const result = memoria.getElementById(request.params.id)

    if(result.length > 0) {
        response.status(200).send(JSON.stringify(result[0]))
    } else {
        result.status(404).send({error: "Producto no encontrado"})
    }
});

app.post("/api/productos/guardar", (request, response) => {
    const producto = request.body;
    if(producto.precio && producto.title && producto.thumbnail){

        memoria.addElement(producto)
        /* response.status(200).send(producto) */
        response.redirect('/');
    } else {
        response.status(400).send({error:"Información incompleta"})
    }
});

app.get('/', (request, response) => {
    response.render('/index.ejs', {
        listExists: false,
        fakeProductos: [{
            title: "PlayStation 5",
            price: 500,
            thumbnail: "https://direct.playstation.com/en-us/consoles/console/playstation5-console.3005816",
            id: 1
        },
        {
            title: "NVIDIA GEFORCE RTX 3090",
            price: 1500,
            thumbnail: "https://assets.nvidia.partners/images/png/nvidia-geforce-rtx-3090.png",
            id: 2
        },
        {
            title: "Teclado inalámbrico mecánico K63 Corsair",
            price: 300,
            thumbnail: "https://www.corsair.com/medias/sys_master/images/images/h1b/h69/9068260327454/-CH-9145050-NA-Gallery-K63-Wireless-SE-01.png",
            id: 4
        }]
    });
});

app.put("/api/productos/actualizar/:id", (request, response) => {
    const {id} = request.params.id;
    const newProduct = request.body;

    memoria.updateElement(newProduct, id);
    response.send(newProduct);
});

app.delete("/api/productos/borrar/:id", (request, response) => {
    Memoria.deleteById(request.body.id)
});



