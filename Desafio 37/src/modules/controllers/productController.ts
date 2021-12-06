import { Request, Response, NextFunction } from 'express';
import { ProductAPI } from '../api/productAPI';
import { ProductQuery } from '../interface/productInterface';

class Producto {
    checkAddProduct (err: Error, req: Request, res: Response, next: NextFunction) {

        const { name, price, description, thumbnail, stock } = req.body;

        if (!name || !price || !description || !thumbnail || !stock ||  
            typeof name !== 'string' || 
            typeof description !== 'string' ||
            typeof thumbnail !== 'string' ||
            isNaN(stock) ||
            isNaN(price)) {
        return res.status(400).json({
            msg: 'Campos del body invalidos',
            error : err
        });
        }

        next();
    }

  async checkProductExists(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const producto = await ProductAPI.getProducts(id);

    if (!producto) {
      return res.status(404).json({
        msg: 'producto not found',
      });
    }
    next();
  }

  async getProducts(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, precio } = req.query;
    if (id) {
      const result = await ProductAPI.getProducts(id);
      if (!result.length)
        return res.status(404).json({
          data: 'objeto no encontrado',
        });

      return res.json({
        data: result,
      });
    }

    const query: ProductQuery = {};

    if (nombre) query.nombre = nombre.toString();

    if (precio) query.precio = Number(precio);

    if (Object.keys(query).length) {
      return res.json({
        data: await ProductAPI.query(query),
      });
    }

    res.render('main',{ products : await ProductAPI.getProducts()} );
  }

  async addProducts(req: Request, res: Response) {
    const newItem = await ProductAPI.addProduct(req.body);

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }

  async updateProducts(req: Request, res: Response) {
    const id = req.params.id;

    const updatedItem = await ProductAPI.updateProduct(id, req.body);

    res.json({
      msg: 'actualizando producto',
      data: updatedItem,
    });
  }

  async deleteProducts(req: Request, res: Response) {
    const id = req.params.id;
    await ProductAPI.deleteProduct(id);
    res.json({
      msg: 'producto borrado',
    });
  }
}

export const productsController = new Producto();