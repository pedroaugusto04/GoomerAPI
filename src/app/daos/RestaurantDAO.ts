import { IRestaurant } from "../models/IRestaurant";

export interface RestaurantDAO{

    getRestaurants(): Promise<IRestaurant[]>;

    createRestaurant(restaurant: IRestaurant): Promise<IRestaurant>;

    updateRestaurant(restaurant:IRestaurant): Promise<IRestaurant>;

    deleteRestaurant(restaurantID: string): Promise<void>;
}