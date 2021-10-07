import { IDao } from '../interface/daos/IDao.mjs';
import mongoose from 'mongoose';
import { ProductSchema } from '../models/mongodb.mjs';

export class MongoDbaaSDao{
    constructor(){
        products: MongoDbaaSDao;
        count: number;
        id: number;

        this.products = [];
        this.id = 1;
        this.count = 1;

        (async () => {
            try{
                await mongoose.connect(
                    "mongodb+srv://cluster0.3xmjz.mongodb.net/ecommerce",
                );
                console.log("DB connected");
            } catch (err){
                console.log("An error occurred", err);
            }finally{
                await mongoose.disconnect();
            }
        })();
    }

    getProducts(){
        let readProducts = model.products.find();
        console.log(readProducts);
        return this.products;
    }

    getProductById(id){
        mongoose.connect(
            "mongodb+srv://cluster0.3xmjz.mongodb.net/ecommerce",
        () => {
            console.log("DB connected");
            model.products.find({ id: id}, (error, docs) => {
                if(error){
                    console.log("An error occurred", error);
                }
                console.log(docs);
                mongoose.disconnect(() => {
                    console.log("DB disconnected");
                });
            });
        }
        );
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
      
          mongoose.connect(
            "mongodb+srv://cluster0.3xmjz.mongodb.net/ecommerce",
            () => {
              console.log("Base de datos conectada");
              model.productos.insertMany(newProduct, (error, docs) => {
                if (error) {
                  console.log("Ocurrio un error al insertar el producto", error);
                }
                console.log(docs);
                mongoose.disconnect(() => {
                  console.log("Base de datos desconectada");
                });
              });
            }
          );
    }

    updateProduct(product, id){
        let index = this.products.findIndex((element) => element.id === id);
        this.products[index] = product;

        mongoose.connect(
            "mongodb+srv://cluster0.3xmjz.mongodb.net/ecommerce",
            () => {
                console.log("DB connected");
                model.products.updateOne(
                    { id: id },
                    {
                        $set:{
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
                        if(error){
                            console.log("An error occurred", error);
                        }
                        console.log(docs);
                        mongoose.disconnect(() => {
                            console.log("DB disconnected");
                        });
                    }
                );
            }
        );
    }

    deleteProduct(id){
        let index = this.products.findIndex((element) => element.id === id);
        this.products.splice(index, 1);

        mongoose.connect(
            "mongodb+srv://cluster0.3xmjz.mongodb.net/ecommerce",
            () => {
                console.log("DB connected");
                model.products.deleteOne({ id: id }, (error, docs) => {
                if(error){
                    console.log("An error occurred", error);
                }
                console.log(docs);
                mongoose.disconnect(() => {
                    console.log("DB disconnected");
                });    
                });
            }
        );
    }


}