import { Product } from "./product";
export class ShoppingCart{
    private cart: Array<Product>;
    private static counter: number = 1;
    private id: number;
    private timestamp: Number;

    constructor(){
        this.cart = Array<Product>();
        this.id = ShoppingCart.counter;
        ShoppingCart.counter++;
        this.timestamp = Date.now();
    }
    public getId(){
        return this.id;
    }
    public getTimestamp(){
        return this.timestamp;
    }
    public getProducts(){
        return this.cart;
    }
    public getProductoById(id: number){
        const producto = this.cart.find(element => element.id === Number(id));
        return producto;
    }
    public addProducto(product: Product){
        this.cart.push(product);
    }
    public deleteProducto(id: number){
        let index = this.cart.findIndex(element => element.id === Number(id));
        this.cart.splice(index, 1);
    }
}