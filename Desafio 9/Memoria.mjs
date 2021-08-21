export class Memoria {
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

    updateElement(element){
        this.array[element] = element
    }

    deleteById(element){
        const deleteProduct = productos.findIndex(element => element.id == element)
        productos.splice(deleteProduct, 1)
    }
}
