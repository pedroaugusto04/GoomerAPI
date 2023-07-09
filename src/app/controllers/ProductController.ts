import { Request, Response } from 'express';
import { ProductServiceImpl } from '../services/ProductServiceImpl';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ProductController {
  private productServiceImpl: ProductServiceImpl;

  constructor(@inject(ProductServiceImpl) productServiceImpl: ProductServiceImpl) {
    this.productServiceImpl = productServiceImpl;
  }

  public getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productServiceImpl.getProducts();
      res.json(products);
    } catch (error) {
      console.error('Failed to get products:', error);
      res.status(500).json({ error: 'Failed to get products' });
    }
  };
}