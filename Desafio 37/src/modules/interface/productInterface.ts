export interface newProductI {
    name?: string;
    price?: number;
    description : string;
    thumbnail : string;
}
  
  export interface ProductI {
    _id: string;
    name: string;
    price: number;
    description : string;
    thumbnail : string;
    timestamp : Date;
}
  
  export interface ProductQuery {
    nombre?: string;
    precio?: number;
   
}
  
  export interface ProductBaseClass {
    get(id?: string | undefined) : any;
    add(data: newProductI): Promise<ProductI>;
    update(id: string, newProductData: newProductI): Promise<ProductI>;
    delete(id: string): Promise<void>;
    query(options: ProductQuery): Promise<ProductI[]>;
}