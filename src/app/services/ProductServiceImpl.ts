import { Product } from "../models/Product";
import { ProductDAO } from "../daos/ProductDAO";
import { inject, injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export class ProductServiceImpl {

    private productDAO: ProductDAO;

    constructor(@inject(ProductDAO) productDAO: ProductDAO) {
        this.productDAO = productDAO;
    }

    public async getProducts(): Promise<Product[]> {
        try {
            const products: Product[] = await this.productDAO.getProducts();
            products.forEach((product) => console.log(product))
            return products;
        } catch (error) {
            console.error('Failed to get products:', error);
            throw error;
        }
    }
}   