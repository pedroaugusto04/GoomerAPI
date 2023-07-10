import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { inject, injectable } from 'inversify';
import { IProduct } from '../models/IProduct';
import 'reflect-metadata';
import { ProductServiceImpl } from '../services/ProductServiceImpl';

@injectable()
export class ProductControllerImpl {
  private productServiceImpl: ProductService;

  constructor(@inject(ProductServiceImpl) productServiceImpl: ProductService) {
    this.productServiceImpl = productServiceImpl;
  }

  public getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productServiceImpl.getProducts();
      res.json(products);
    } catch (error) {
      console.error('Failed to get products.', error);
      res.status(500).json({ error: 'Failed to get products' });
    }
  };

  public createProduct = async(req: Request, res:Response): Promise<void> => {
    const product: IProduct = req.body;
    try {
      const productRes = await this.productServiceImpl.createProduct(product);
      res.status(201).json(productRes);
    } catch (error) { 
      console.error('Failed to create product.', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  public updateProduct = async(req: Request, res: Response): Promise<void> => {
    const product: IProduct = req.body;
    try {
      const productRes = await this.productServiceImpl.updateProduct(product);
      res.json(productRes);
    } catch (error) { 
      console.error('Failed to update product.', error);
      res.status(500).json({ error: 'Failed to update product.' });
    }
  }

  public deleteProduct = async(req: Request, res: Response): Promise<void> => {
    const productID: String = req.params.productID;
    try {
      await this.productServiceImpl.deleteProduct(productID);
      res.status(204).json();
    } catch (error) { 
      console.error('Failed to delete product.', error);
      res.status(500).json({ error: 'Failed to delete product.' });
    }
  }
}