import { ProductCategories } from "./ProductCategories";

export interface IProduct {
    id: string;
    name: string;
    photo: string;
    price: number;
    category: ProductCategories;
    sale_description?: string;
    sale_price?: string;
    sale_start_date?: string;
    sale_end_date?: string;
}