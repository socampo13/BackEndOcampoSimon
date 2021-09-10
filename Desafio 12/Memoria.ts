export class Memoria {
    static deleteById(id: any) {
        throw new Error('Method not implemented.');
    }
    productos: never[];
    count: number;
    array: any;
    constructor() {
        this.productos = [];
        this.count = 0;
    }

    getArray(){
        return this.productos;
    }

    getElementById(id: string){
        const result = this.productos.filter(el => el.id == id)

        return result;
    }

    addElement(element: any){
        this.productos.push({ ...element,id:this.count+1});
        this.count++;
        return element;
    }

    updateElement(element: string | number){
        this.array[element] = element
    }

    deleteById(){
        const deleteProduct = this.productos.findIndex(element => element.id == element)
        this.productos.splice(deleteProduct, 1)
    }
}