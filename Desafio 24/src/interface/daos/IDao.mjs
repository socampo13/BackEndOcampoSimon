
export class IDao{
    constructor(getProducts, getProductById, insertProduct, updateProduct, deleteProduct){

        this.getProducts = getProducts;
    
        this.getProductById = getProductById;
    
        this.insertProduct = insertProduct;
    
        this.updateProduct = updateProduct;
    
        this.deleteProduct = deleteProduct;
    }
}

