import { Product } from './product';
export class Memoria {
    private array: Array<Product>;
    private count: number;

    constructor(){
        this.array = [];
        this.count = 0;
    }
    getArray(){
        return this.array;
    }
    getElementById(id: number){
        const result = this.array.find(element => element.id === Number(id));
        return result;
    }
    addElement(object: Product){
        this.array.push({ ...object, id: this.count +1, timestamp: new Date() });
        this.count++;
        return object;
    }
    updateObject(newProduct: Product, id: number){
        let index = this.array.findIndex(element => element.id === Number(id));
        this.array[index] = newProduct;
    }
    deleteObject(id: number){
        let index = this.array.findIndex(element => element.id === Number(id));
        this.array.splice(index, 1);
    }
}