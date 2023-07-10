import { IProduct } from "../models/IProduct";

export interface ProductService { 

    getProducts(): Promise<IProduct[]>;

    createProduct(product: IProduct): Promise<IProduct>;

    // getProduct ?
    
    updateProduct(product: IProduct): Promise<IProduct>;

    deleteProduct(productID: String): Promise<void>;
    
}