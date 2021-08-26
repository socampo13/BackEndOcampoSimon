import express, { request, response } from 'express';
import { Memoria } from './Memoria.mjs';
import path from 'path';

const app = express();
const Port = 8080;
const memoria = new Memoria();
const router = express.Router();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('${__dirname}/public'));
app.use('/api', router);
app.set("view engine", ejs);

app.listen(Port, () => {
    console.log("El servidor se está escuchando en el puerto 8080");
});

server.on('error', error => {
    console.log(error);
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
    response.render('/index.ejs');
})

app.put("/api/productos/actualizar/:id", (request, response) => {
    const {id} = request.params.id;
    const newProduct = request.body;

    memoria.updateElement(newProduct, id);
    response.send(newProduct);
});

app.delete("/api/productos/borrar/:id", (request, response) => {
    Memoria.deleteById(request.body.id)
});



