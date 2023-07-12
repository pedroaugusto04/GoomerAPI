import { IProduct } from "../models/IProduct";

export interface ProductService {

    getProducts(restaurant_id: string): Promise<IProduct[]>;

    createProduct(restaurant_id: string, product: IProduct): Promise<IProduct>;

    updateProduct(product: IProduct,product_id: string): Promise<IProduct>;

    deleteProduct(productID: String): Promise<void>;

}