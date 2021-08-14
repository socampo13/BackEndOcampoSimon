import express, { request, response } from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const Port = 8080;



/* const productos = [{
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
}]; */

class Memoria {
    constructor() {
        this.productos = [];
        this.count = 0;
    }

    getArray(){
        return this.productos;
    }

    getElementById(id){
        const result = this.productos.filter(el => el.id == id)

        return result;
    }

    addElement(element){
        this.productos.push({ ...element,id:this.count+1});
        this.count++;
        return element;
    }
}

const memoria = new Memoria();
/* memoria.addElement({
    title: "Xbox Series X",
    price: 600,
    thumbnail: "https://i.blogs.es/fe5865/xbox1/450_1000.jpg"
}) */

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
})

app.listen(Port, () => {
    console.log("El servidor se está escuchando en el puerto 8080");
});

