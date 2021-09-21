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
var memoria_1 = require("./memoria");
var shoppingCart_1 = require("./shoppingCart");
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var SocketIO = __importStar(require("socket.io"));
var PORT = 8080 || process.env.PORT;
var app = (0, express_1.default)();
var router = express_1.default.Router();
var routerCart = express_1.default.Router();
var __dirname = path_1.default.resolve();
var memoria = new memoria_1.Memoria();
var shoppingCart = new shoppingCart_1.ShoppingCart();
var server = http_1.default.createServer(app);
var ioServer = new SocketIO.Server(server);
var isAdmin = true;
app.use(express_1.default.static(__dirname + "/public"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/productos', router);
app.use('/shoppingCart', routerCart);
app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', (0, express_handlebars_1.default)({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/pages'
}));
server.listen(PORT, function () {
    console.log('Server listening on port ${PORT}');
});
server.on('error', function (error) {
    console.log(error);
});
//////////ROUTAS///////
app.get('productos/vista', function (request, response) {
    response.render('pages/index.hbs', { productos: memoria.getArray() });
});
app.get('/productos/listar', function (request, response) {
    var result = memoria.getArray();
    if (result.length > 0) {
        response.status(200).send(JSON.stringify(result));
    }
    else {
        response.status(404).send({ error: 'No productos loaded' });
    }
});
app.get('/productos/listar/:id', function (request, response) {
    var parametersId = parseInt(request.params.id);
    var result = memoria.getElementById(parametersId);
    if (result == null) {
        response.status(404).send('Product not found');
    }
    response.status(200).send(JSON.stringify(result));
});
app.post('/agregar', function (request, response) {
    if (isAdmin) {
        var product = request.body;
        if (product.name && product.description && product.code) {
            memoria.addElement(product);
            ioServer.sockets.emit('loadProducts', memoria.getArray());
            response.redirect('/');
        }
        else {
            response.status(400).send({ error: 'Incomplete information' });
        }
    }
    else {
        response.send({
            error: -1,
            description: "route '/agregar' not authorized",
        });
    }
});
app.put('/productos/actualizar/:id', function (request, response) {
    if (isAdmin) {
        var parametersId = parseInt(request.params.id);
        var newProduct = request.body;
        memoria.updateObject(newProduct, parametersId);
        response.send(newProduct);
    }
    else {
        response.send({ error: -1, description: "route '/productos/actualizar/:id' not authorized" });
    }
});
app.delete('/productos/borrar/:id', function (request, response) {
    if (isAdmin) {
        var parametersId = parseInt(request.params.id_producto);
        var deleteObject = memoria.getElementById(parametersId);
        memoria.deleteObject(parametersId);
    }
    else {
        response.send({ error: -1, description: "route '/productos/borrar/:id' not authorized" });
    }
});
routerCart.post('/listar', function (request, response) {
    var idQuery = Number(request.query.id);
    if (!isNaN(idQuery)) {
        var producto = shoppingCart.getProductoById(idQuery);
        response.send({ productInCart: producto });
    }
    else {
        var products = shoppingCart.getProducts();
        response.send({
            CartId: shoppingCart.getId(),
            timestampCart: shoppingCart.getTimestamp(),
            ProductsInCart: products,
        });
    }
});
routerCart.post('/agregar/:id_producto', function (request, response) {
    var parametersId = parseInt(request.params.id_producto);
    var producto = memoria.getElementById(parametersId);
    shoppingCart.addProducto(producto);
    response.redirect('/');
});
routerCart.delete('/borrar/:id', function (request, response) {
    var parametersId = parseInt(request.params.id);
    var deleteObject = shoppingCart.getProductoById(parametersId);
    shoppingCart.deleteProducto(parametersId);
    response.status(200).send(deleteObject);
});
var messages = [];
ioServer.on('connection', function (socket) {
    console.log('New client online');
    socket.emit('messages', messages);
    socket.on('new-message', function (data) {
        messages.push(data);
        ioServer.sockets.emit('messages', messages);
    });
});
