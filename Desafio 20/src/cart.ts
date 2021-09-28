export class Cart{
    private count: any;
    public id: any;
    public cart: Array<Cart>

    constructor(){
        this.cart = [];
    }

    getCart(){
        return this.cart;
    }
    
    getElementByIdCart(id: any){
        const result = this.cart.find((element) => element.id === Number(id));
        return result;
    }

    addElementToCart(object: any){
        this.cart.push(object);
        return object;
    }

    updateObject(newProduct: any, id: any){
        let index = this.cart.findIndex((element) => element.id === Number(id));
        this.cart[index] = newProduct;
    }

    deleteObject(id: any){
        let index = this.cart.findIndex((element) => element.id === Number(id));
        this.cart.splice(index, 1);
    }
}