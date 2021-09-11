"use strict";
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
var Memoria = __importStar(require("./Memoria"));
var http_1 = __importDefault(require("http"));
var SocketIo = __importStar(require("socket.io"));
var socket_io_1 = require("socket.io");
var path_1 = __importDefault(require("path"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var app = (0, express_1.default)();
var server = new http_1.default.Server(app);
var ioServer = new socket_io_1.Server(server);
var Port = 8080;
var memoria = new Memoria.Memoria();
var router = express_1.default.Router();
var io = new SocketIo.Server(server);
var __dirname = path_1.default.resolve();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('api/', router);
app.set('views', '/views');
app.set('partials', '/partials');
app.set('view engine', 'hbs');
app.engine('hbs', (0, express_handlebars_1.default)({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/pages'
}));
server.on("error", function (error) {
    if (error) {
        throw Error("Error iniciando el servidor: " + error);
    }
});
server.listen(Port, function () {
    console.log("Server listening on port: " + Port);
});
var Memory = [];
var messages = [];
io.sockets.on('connection', function (socket) {
    console.log('Gracias');
    socket.on('prueba', function (data) {
        io.sockets.emit('carga producto', data);
    });
});
io.on('connection', function (socket) {
    console.log('New user online');
    socket.emit('messages', messages);
    socket.on('new-message', function (data) {
        messages.push(data);
        ioServer.sockets.emit('messages', messages);
    });
});
app.get('/', function (request, response) {
    response.render('main.hbs');
});
app.get("/api/productos/listar", function (request, response) {
    var result = memoria.getArray();
    if (result.length > 0) {
        response.status(200).send(JSON.stringify(result));
    }
    else {
        result.status(404).send({ error: "No hay productos cargados" });
    }
});
app.get("/api/productos/listar/:id", function (request, response) {
    var result = memoria.getElementById(request.params.id);
    if (result.length > 0) {
        response.status(200).send(JSON.stringify(result[0]));
    }
    else {
        result.status(404).send({ error: "Producto no encontraado" });
    }
});
app.get('/', function (request, response) {
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
app.put("/api/productos/actualizar/:id", function (request, response) {
    var id = request.params.id;
    var newProduct = request.body;
    memoria.updateElement(newProduct, id);
    response.send(newProduct);
});
app.delete("/api/productos/borrar/:id", function (request, response) {
    Memoria.Memoria.deleteById(request.body.id);
});
