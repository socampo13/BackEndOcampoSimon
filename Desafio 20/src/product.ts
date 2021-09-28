const mongoose = require("mongoose");
const model = require("./mongoDB/schema");

export class Product{
    private array: Array<Product>;
    private count: any;
    public id: any;

    constructor(){
        this.array = [];
        this.count = 0;
    }
    getArray(){
        return this.array;
    }

    getElementById(id: any){
        const result = this.array.find((element) => element.id === Number(id));

        mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
            console.log("Database connected");
            model.products.find({id: id}, (error: any, docs: any) => {
                if(error){
                    throw new Error();
                }
                console.log(docs);
                mongoose.disconnect(() => {
                    console.log("Database disconnected");
                });
            });
        });

        return result;
    }
    
    addElement(product: any){
        const date = new Date();
        const dateTemplate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;

        this.array.push({ ...product, id: this.count + 1, dateTemplate,});
        this.count++;

        const saveProduct = { ...product, id: this.count, dateTemplate,};

        mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
            console.log("Database connected");
            model.products.insertMany(saveProduct, (error: any, docs: any) => {
                if(error){
                    throw new Error();
                }
                console.log(docs);
                mongoose.disconnect(() => {
                    console.log("Database disconnected");
                });
            });
        });

        return product;
    }

    updateObject(newProduct: any, id: any){
        let index = this.array.findIndex((element) => element.id === Number(id));
        this.array[index] = newProduct;

        mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
            console.log("Database connected");
            model.products.update(
                { id: id },
                {
                  $set: {
                    id: newProduct.id,
                    templateDate: newProduct.templateDate,
                    title: newProduct.title,
                    description: newProduct.description,
                    code: newProduct.code,
                    price: newProduct.price,
                    stock: newProduct.stock,
                    thumbnail: newProduct.thumbnail,
                  },
                },
                (error: any, docs: any) => {
                  if (error) {
                    throw new Error();
                  }
                  console.log(docs);
                  mongoose.disconnect(() => {
                    console.log("Database disconnected");
                  });
                }
              );
            });
     }
    deleteObject(id: any) {
        let index = this.array.findIndex((element) => element.id === Number(id));
        this.array.splice(index, 1);

        mongoose.connect("mongodb://localhost:27017/ecommerce", () => {
            console.log("Database connected");
            model.products.deleteOne({id: id}, (error: any, docs: any) => {
                if(error){
                    throw new Error();
                }
                console.log(docs);
                mongoose.disconnect(() => {
                    console.log("Database disconnected");
                    
                });
            });
        });
    }
         
}