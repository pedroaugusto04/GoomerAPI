import { IProduct } from "../models/IProduct";
import { ProductDAO } from "../daos/ProductDAO";
import { ProductDAOImpl } from "../daos/ProductDAOImpl";
import { inject, injectable } from "inversify";
import { ProductService } from "./ProductService";
import 'reflect-metadata';

@injectable()
export class ProductServiceImpl implements ProductService {

    private productDAOImpl: ProductDAO;

    constructor(@inject(ProductDAOImpl) productDAO: ProductDAO) {
        this.productDAOImpl = productDAO;
    }

    public async getProducts(restaurant_id: string): Promise<IProduct[]> {
        try {
            const products: IProduct[] = await this.productDAOImpl.getProducts(restaurant_id);
            return products;
        } catch (error) {
            console.error('Failed to get products:', error);
            throw error;
        }
    }
    
    public async createProduct(restaurant_id: string,product: IProduct): Promise<IProduct> {
        try {
            const productRes: IProduct = await this.productDAOImpl.createProduct(restaurant_id,product);
            return productRes;
        } catch (error) {
            console.error("Failed to create product: ", error);
            throw error;
        }
    }
    
    public async updateProduct(product: IProduct,product_id: string): Promise<IProduct> {
        try {
            const productRes: IProduct = await this.productDAOImpl.updateProduct(product,product_id);
            return productRes;
        } catch (error) {
            console.error("Failed to update product: ", error);
            throw error;
        }
    }
    public async deleteProduct(productID: string): Promise<void> {
        try {
            await this.productDAOImpl.deleteProduct(productID);
        } catch (error) {
            console.error("Failed to delete product: ", error);
            throw error;
        }
    }
}   