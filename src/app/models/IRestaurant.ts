import { IProduct } from './IProduct';

export interface IRestaurant {
    id: string;
    name: string;
    address: Address;
    photo: string;
    products: IProduct[];
    opening_time: string;
    closing_time: string;
}