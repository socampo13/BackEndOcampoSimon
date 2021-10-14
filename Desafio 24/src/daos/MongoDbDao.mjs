import { IDao } from '../interface/daos/IDao.mjs';
import mongoose from 'mongoose';
import { ProductSchema } from '../models/mongodb.mjs';

export class MongoDbDao{
    constructor(){
         /* products = FileSystemDao;
        count = number;
        id = number; */

        this.products = [];
        this.id = 1;
        this.count = 1;

        (async () => {
            try {
                mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
                    console.log("DB connected");
                });
            } catch (err) {
                console.log("An error occurred");
            }finally{
                mongoose.disconnect(() => {
                    console.log("DB disconnected");
                });
            }
        })();
    }

    getProducts(){
        async () => {
            let readProducts = await model.products.find();
            console.log(readProducts);
        };
        return this.products;
    }

    getProductsById(id){
        mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
            console.log("DB connected");
            model.products.find({ id: id }, (error, docs) => {
                if(error){
                    throw new Error();
                }
                console.log(docs);
                mongoose.disconnect(() => {
                    console.log("DB disconnected");
                });
            });
        });
        const product = this.products.find((element) => element.id === id);
        console.log(product);
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
            ...product,
            id: this.count + 1,
            templateDate,
          });
      
          this.count++;
      
          mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
            console.log("Base de datos conectada");
            model.productos.insertMany(newProduct, (error, docs) => {
              if (error) {
                throw new Error();
              }
              console.log(docs);
              mongoose.disconnect(() => {
                console.log("Base de datos desconectada");
              });
            });
          });
    }

    updateProduct(product, id){
        let index = this.products.findIndex((element) => element.id === id);
        this.products[index] = product;
    
        mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
          console.log("Base de datos conectada");
          model.productos.update(
            { id: id },
            {
              $set: {
                id: product.id,
                templateDate: product.templateDate,
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                stock: product.stock,
                thumbnail: product.thumbnail,
              },
            },
            (error, docs) => {
              if (error) {
                throw new Error();
              }
              console.log(docs);
              mongoose.disconnect(() => {
                console.log("Base de datos desconectada");
              });
            }
          );
        });  
    }

    deleteProduct(id){
        let index = this.products.findIndex((element) => element.id === id);
        this.products.splice(index, 1);

        mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
      console.log("Base de datos conectada");
      model.productos.deleteOne({ id: id }, (error, docs)=> {
        if (error) {
          throw new Error();
        }
        console.log(docs);
        mongoose.disconnect(() => {
          console.log("Base de datos desconectada");
        });
      });
    });
    }
}