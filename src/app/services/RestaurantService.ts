import { IRestaurant } from "../models/IRestaurant";

export interface RestaurantService {
    

    getRestaurants(): Promise<IRestaurant[]>;
   
    createRestaurant(restaurant: IRestaurant): Promise<IRestaurant>;

    //getRestaurant(restaurantID: string): Promise<IRestaurant>;

    updateRestaurant(restaurant: IRestaurant): Promise<IRestaurant>;

    deleteRestaurant(restaurantID: string): Promise<void>;
}