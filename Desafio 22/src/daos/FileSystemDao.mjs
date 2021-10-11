import { IDao } from '../interface/daos/IDao.mjs';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

export class FileSystemDao{
    constructor(){
        /* products = FileSystemDao;
        count = number;
        id = number; */

        this.products = [];
        this.count = 1;
        this.id = 1;
    } 

    getProducts(){
        fs.readFile(`${__dirname}/db/filesystem.txt`, "utf8", (err, data) => {
           if(data){
               console.log(data);
               return data;
           }else{
               console.log("Empty File");
           }
        });

        return this.products;
    }

    getProductById(id){
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

        fs.appendFile(
            `${__dirname}/db/filesystem.txt`,
            JSON.stringify(newProduct),
            (err) => {
                if (err){
                    console.log("An error occurred");
                }else{
                    this.products.push({
                        ...newProduct,
                    });
                    this.count++;
                    console.log("Product added successfully");
                }
            }
        );
    }

    updateProduct(product, id){
        let index = this.products.findIndex((element) => element.id === id);
        this.products[index] = product;

        fs.writeFile(`${__dirname}/db/filesystem.txt`, product, (err) => {
            if(err){
                console.log("An error occurred");
            }else{
                console.log("Product updated");
            }
        });

    }

    deleteProduct(id){
        let index = this.products.findIndex((element) => element.id === id);
        this.products.splice(index, 1);
    }
}