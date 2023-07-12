import { IRestaurant } from "../models/IRestaurant";

export interface RestaurantService {
    

    getRestaurants(): Promise<IRestaurant[]>;
   
    createRestaurant(restaurant: IRestaurant): Promise<IRestaurant>;

    getRestaurant(restaurant_id: string): Promise<IRestaurant>;

    updateRestaurant(restaurant: IRestaurant): Promise<IRestaurant>;

    deleteRestaurant(restaurant_id: string): Promise<void>;
}