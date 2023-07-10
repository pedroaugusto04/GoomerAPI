import { IProduct } from "../models/IProduct";

export interface ProductDAO{

    getProducts(): Promise<IProduct[]>;

    createProduct(product: IProduct): Promise<IProduct>;

    updateProduct(product:IProduct): Promise<IProduct>;

    deleteProduct(productID: string): Promise<void>;
}