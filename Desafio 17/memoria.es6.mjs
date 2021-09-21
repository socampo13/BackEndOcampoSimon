export class Memoria {
    constructor() {
        this.array = [];
        this.count = 0;
    }
    getArray() {
        return this.array;
    }
    getElementById(id){
        const result = this.array.find(element => element.id === Number(id));
        return result;
    }
    addElement(object){
        this.array.push({ ...object, id: this.count + 1});
        this.count++;
        return object;
    }
    updateObject(newProduct, id){
        let index = this.array.findIndex(element => element.id === Number(id));
        this.array[index] = newProduct;
    }
    deleteObject(id){
        let index = this.array.findIndex(element => element.id === Number(id));
        this.array.splice(index, 1);
    }
}