import express from 'express';
import { Memoria } from './Memoria.es6.mjs';
import path from 'path';
import http from 'http';
import * as SocketIo from 'socket.io'; 
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';

///////////////////////////////////////////////

const app = express(); 
const server = http.Server(app); 
const ioServer = new Server(server);
const Port = 8080;
const memoria = new Memoria();
const router = express.Router();
const io = new SocketIo.Server(server);
const __dirname = path.resolve();


//////////////////////////////////////////////////////////////////

app.use(express.json());
app.use(express.urlencoded({extended:true}));
 app.use(express.static('${__dirname}/public')); 
app.use('/api', router);

app.set('views', './views')
app.set('partials','./partials')
//app.set("view engine", ejs);
app.set("view engine", 'hbs');
app.engine('hbs',
handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/pages'
    })
);

///////////////////////////////////////////////////////

server.listen(Port, error  => {
    if (error) {
        throw Error(`Error iniciando el servidor: ${error}`);
    }
    console.log(`Server listening on port ${Port}`);
});

///////////////WEB SOCKET

/* const messages = [
    {
        author: "Simón",
        text: "¡Bienvenidos!",
    },
    {
        author: "Laura",
        text: "¡Esperamos que encuentres todo lo que necesitas!",
    },
    {
        author: "Tienda",
        text: "Trabajamos para darte el mejor servicio",
    },
]; */

const messages = [];

io.sockets.on('connection', (socket) => {
    console.log('Gracias');
    socket.on('prueba', (data) => {
       io.sockets.emit('carga producto', data)
    });
});

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    socket.emit("messages", messages);

    socket.on("new-message", (data) => {
        messages.push(data);
        ioServer.sockets.emit("messages", messages);
    });
});






//////////////////////////////////////////

app.get('/', (request, response) => {
    response.render('main.hbs')
})

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


//////////Agregamos producto por id////////////////
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


///////////////Actualizamos producto por id///////////
app.put("/api/productos/actualizar/:id", (request, response) => {
    const {id} = request.params.id;
    const newProduct = request.body;

    memoria.updateElement(newProduct, id);
    response.send(newProduct);
});


//Eliminamos producto por ID////////
app.delete("/api/productos/borrar/:id", (request, response) => {
    Memoria.deleteById(request.body.id)
});