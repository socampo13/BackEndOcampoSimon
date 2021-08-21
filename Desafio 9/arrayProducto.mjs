import express, { request, response } from 'express';
import { Memoria } from './Memoria.mjs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const Port = 8080;

const memoria = new Memoria();


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
        response.status(200).send(producto)
    } else {
        response.status(400).send({error:"Información incompleta"})
    }
});

app.put("/api/productos/actualizar/:id", (request, response) => {
    const {id} = request.params;
    const newProduct = producto.getElementById(id);

    if(newProduct.length > 0){
        producto.updateElement(newProduct);
        response.status(200).json(producto.getElementById(id))
    }else{
        response.status(400).send({error: "No se pudo actualizar"})
    }
});

app.delete("/api/productos/borrar/:id", (request, response) => {
    Memoria.deleteById(request.body.id)
});

app.listen(Port, () => {
    console.log("El servidor se está escuchando en el puerto 8080");
});

