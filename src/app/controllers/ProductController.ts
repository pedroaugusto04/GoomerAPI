import { IProduct } from "../models/IProduct";

export interface ProductController{

    getProducts(): Promise<IProduct[]>;

    createProduct(product: IProduct): Promise<IProduct>;

    updateProduct(product: IProduct,product_id: string): Promise<IProduct>;

    deleteProduct(productID: string): Promise<void>;
}