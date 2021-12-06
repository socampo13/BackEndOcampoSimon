import { newProductI, ProductI, ProductQuery } from '../interface/productInterface';
import {productBox} from '../models/productModel'


class prodAPI {
  private productos;

  constructor() {
    this.productos = productBox;
  }

  async getProducts(id: string | undefined = undefined) : Promise<any> {
    if (id) return this.productos.get(id);

    return this.productos.get();
  }

  async addProduct(productData: newProductI): Promise<ProductI> {
    const newProduct = await this.productos.add(productData);
    return newProduct;
  }

  async updateProduct(id: string, productData: newProductI) {
    const updatedProduct = await this.productos.update(id, productData);
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    await this.productos.delete(id);
  }

  async query(options: ProductQuery) {
    return await this.productos.query(options);
  }
}

export const ProductAPI = new prodAPI();