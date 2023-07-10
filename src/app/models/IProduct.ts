import { ProductCategories } from "./ProductCategories";

export interface IProduct {
    id: string;
    name: string;
    photo: string;
    price: number;
    category: ProductCategories;
    saleDescription?: string;
    salePrice?: string;
}