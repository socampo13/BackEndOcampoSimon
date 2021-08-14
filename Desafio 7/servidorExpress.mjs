import express, { request, response } from "express";

const app = express();
const server = app.listen(8080, () => {
    console.log("Servidor escuchando en 8080"); //marcamos en dónde estará escuchando el servidor
});

server.on('error', (error) => {
    console.log(error);
});

const productos = [{
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
}];

let contadorVisitasItems = 0;       //hacemos contadores para las visitas a cada get
let contadorVisitasItemsRandom = 0;

app.get('/items', (request, response) => {
    contadorVisitasItems++;
    response.send({
        items: productos,
        cantidad: productos.length,
    });                //la respuesta que daremos al entrar en /items
});

app.get('/item-random', (request, response) => {
    contadorVisitasItemsRandom++;
    response.send({
       item: productos[1],      //la respuesta que daremos al entrar en /items-random
    });
});

app.get('/visitas', (request, response) => {
    response.send({
        visitas: {
            items: contadorVisitasItems,
            item: contadorVisitasItemsRandom,
        },
    });
});

