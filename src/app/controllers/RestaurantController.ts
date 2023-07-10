import { IRestaurant } from "../models/IRestaurant";

export interface RestaurantController{

    getRestaurants(): Promise<IRestaurant[]>;

    createRestaurant(restaurant: IRestaurant): Promise<IRestaurant>;
    
    // get restaurant

    updateRestaurant(restaurant:IRestaurant): Promise<IRestaurant>;

    deleteRestaurant(restaurantID: string): Promise<void>;
}