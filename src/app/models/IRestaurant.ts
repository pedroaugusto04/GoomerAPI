import { IProduct } from './IProduct';

export interface IRestaurant {
    id: string;
    name: string;
    address: Address;
    photo: string;
    sale_start_date: string;
    sale_end_date: string;
    products: IProduct[];
}