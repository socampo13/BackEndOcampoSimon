import { IDao } from '../interface/daos/IDao.mjs';
import path from 'path';
import admin from 'firebase-admin';

const __dirname = path.resolve();
const serviceAccount = (`${__dirname}/db/makeithappen-e5ea6-firebase-adminsdk-7io2x-6aed02ae9c.json`);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "makeithappen.firebaseio.com",
});

const db = admin.firestore();
const collection = db.collection("products");

export class FirebaseDao{
    constructor(){
         /* products = FileSystemDao;
        count = number;
        id = number; */
        this.products = [];
        this.id = 1;
        this.count = 1;
    }

    getProducts(){
        async () => {
            const snapshot = await db.collection("products").get();
            console.log(snapshot);
        };
        return this.products;
    }

    getProductById(id){
        const product = this.products.find((element) => element.id === id);
        console.log(product);

        const queryRef = collection.where("id", "==", id);
        console.log(queryRef);

        return product;
    }

    insertProduct(product){
        const date = new Date();
        const templateDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
          
        const newProduct = {
            ...product,
            id: this.count,
            templateDate,
        };

        this.products.push({
            ...newProduct,
        });
        this.count++;
        console.log("Product added succesfully");
    
        const productFb = db
            .collection("products")
            .doc(`product: ${newProduct.id}`);
        productFb.set(newProduct);
    }

    updateProduct(product, id){
        const date = new Date();
        const templateDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
        
        const newProduct = {
            ...product,
            id: this.count,
            templateDate,
        };
        let index = this.products.findIndex((element) => element.id === id);
        this.products[index] = product;
        const productFb = db
            .collection("products")
            .doc(`product: ${newProduct.id}`);
            productFb.set(newProduct);
    }

    deleteProduct(id){
        let index = this.products.findIndex((element) => element.id === id);
        this.products.splice(index, 1);

        const res = db.collection("products").doc(`product: ${id}`).delete();
    }
}