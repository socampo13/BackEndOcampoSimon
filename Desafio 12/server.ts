import express, { request, response } from 'express';
/* import { Memoria } from "./Memoria.mjs"; */
import http from 'http';
import * as SocketIo from 'socket.io';
import { Server } from 'socket.io'


const app = express();
const server = new http.Server(app);
const ioServer = new Server(server);
const Port = 8080;
const memoria = new Memoria();
const router = express.Router();
const io = new SocketIo.Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('api/', router);
app.set('views', '/views');
app.set('partials', '/partials');
app.set('view engine', 'hbs');


server.on("error", (error) => {
    if(error) {
        throw Error(`Error iniciando el servidor: ${error}`);
    }
})

server.listen(Port, () => {    
    console.log(`Server listening on port: ${Port}`);    
});

class Memoria {
    static deleteById(id: any) {
        throw new Error('Method not implemented.');
    }
    productos: never[];
    count: number;
    array: any;
    constructor() {
        this.productos = [];
        this.count = 0;
    }

    getArray(){
        return this.productos;
    }

    getElementById(id: string){
        const result = this.productos.filter(el => {
            return el.id == id;
        })

        return result;
    }

    addElement(element: any){
        this.productos.push({ ...element,id:this.count+1});
        this.count++;
        return element;
    }

    updateElement(element: string | number){
        this.array[element] = element
    }

    deleteById(){
        const deleteProduct = this.productos.findIndex(element => {
            return element.id == element;
        })
        this.productos.splice(deleteProduct, 1)
    }
}


interface Message {
    email: string;
    fecha: string;
    texto: string;
}
const messages: Array<Message> = []

io.sockets.on('connection', (socket) => {
    console.log('Gracias');
    socket.on('prueba', (data) => {
        io.sockets.emit('carga producto', data)
    });
});

io.on('connection', (socket) => {
    console.log('New user online');
    socket.emit('messages', messages);

    socket.on('new-message', (data) => {
        messages.push(data);
        ioServer.sockets.emit('messages', messages);
    });
});

app.get('/', (request, response) => {
    response.render('main.hbs')
});

app.get("/api/productos/listar", (request, response) => {
    const result = memoria.getArray();

    if(result.length > 0 ) {
        response.status(200).send(JSON.stringify(result));
    } else {
        result.status(404).send({error: "No hay productos cargados"});
    }
});

app.get("/api/productos/listar/:id", (request, response) => {
    const result = memoria.getElementById(request.params.id);

    if(result.length > 0 ) {
        response.status(200).send(JSON.stringify(result[0]));
    } else {
        result.status(404).send({error: "Producto no encontraado"})
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
    const id = request.params.id;
    const newProduct = request.body;

    memoria.updateElement(newProduct, id);
    response.send(newProduct);
});

app.delete("/api/productos/borrar/:id", (request, response) => {
    Memoria.deleteById(request.body.id)
});


