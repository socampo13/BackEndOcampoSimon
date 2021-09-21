import { options } from '../mariaDB.js';
import knex from 'knex';

knex.schema.createTable("products", (table) => {
    table.increments("id");

    table.string("title");

    table.string("description");

    table.integer("code");

    table.float("price");

    table.integer("stock");

    table.string("thumbnail");
})
.then(() => console.log("New table created succesfully"))

.catch((error) => {
    console.log(error);
    throw error;
})
.finally(() => {
    knex.destroy();
});

const products = [
    {
        title: "Caja básica",
        description: "Caja sorpresa con 2 obsequios",
        code: 00001,
        price: 30000,
        stock: 20,
        thumbnail: "https://images.pexels.com/photos/5957128/pexels-photo-5957128.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
       title: "Caja cumpleaños",
       description: "Caja para el mejor cumpleaños",
       code: 00002,
       price: 70000,
       stock: 30,
       thumbnail: "https://images.pexels.com/photos/7180795/pexels-photo-7180795.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
        title: "Caja graduación",
        description: "Caja sorpresa para celebrar graduaciones",
        code: 00003,
        price: 50000,
        stock: 25,
        thumbnail: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
];

knex("products")
.insert(products)
.then(() => console.log("New data"))
.catch((error) => {
    console.log(error);
    throw error;
})
.finally(() => {
    knex.destroy();
});
///////////////////SEARCH////////
knex.from("products")
    .select("*")
    .then((rows) => {
        for (const row of rows){
            console.log(`${row["id"]} ${row["title"]} ${row["price"]}`);
        }
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
    .finally(() => {
        knex.destroy();
    });
/////////////////UPDATE////////
knex.from("products")
    .where("price", "30000")
    .update("price", "37000")
    .then(() => {
        console.log("Product updated succesfully");
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
    .finally(() => {
        knex.destroy();
    });
//////////DELETE//////////////
knex.from("products")
    .del("title", "Caja graduación")
    .then(() => {
        console.log("Product deleted");
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
    .finally(() => {
        knex.destroy();
    });