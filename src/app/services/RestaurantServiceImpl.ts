import { IRestaurant } from "../models/IRestaurant";
import { RestaurantDAO } from "../daos/RestaurantDAO";
import { RestaurantDAOImpl } from "../daos/RestaurantDAOImpl";
import { inject, injectable } from "inversify";
import { RestaurantService } from "./RestaurantService";
import 'reflect-metadata';

@injectable()
export class RestaurantServiceImpl implements RestaurantService {

    private restaurantDAOImpl: RestaurantDAO;

    constructor(@inject(RestaurantDAOImpl) restaurantDAOImpl: RestaurantDAO) {
        this.restaurantDAOImpl = restaurantDAOImpl;
    }

    public async getRestaurants(): Promise<IRestaurant[]> {
        try {
            const restaurants: IRestaurant[] = await this.restaurantDAOImpl.getRestaurants();
            return restaurants;
        } catch (error) {
            console.error('Failed to get restaurants:', error);
            throw error;
        }
    }

    public async createRestaurant(restaurant: IRestaurant): Promise<IRestaurant> {
        try {
            const restaurantRes: IRestaurant = await this.restaurantDAOImpl.createRestaurant(restaurant);
            return restaurantRes;
        } catch (error) {
            console.error("Failed to create product: ", error);
            throw error;
        }
    }

    public async getRestaurant(restaurant_id: string): Promise<IRestaurant> {
        try {
            const restaurant: IRestaurant = await this.restaurantDAOImpl.getRestaurant(restaurant_id);
            return restaurant;
        } catch (error) {
            console.error('Failed to get restaurants:', error);
            throw error;
        }
    }

    public async updateRestaurant(restaurant: IRestaurant): Promise<IRestaurant> {
        try {
            const restaurantRes: IRestaurant = await this.restaurantDAOImpl.updateRestaurant(restaurant);
            return restaurantRes;
        } catch (error) {
            console.error("Failed to update product: ", error);
            throw error;
        }
    }
    public async deleteRestaurant(restaurant_id: string): Promise<void> {
        try {
            await this.restaurantDAOImpl.deleteRestaurant(restaurant_id);
        } catch (error) {
            console.error("Failed to delete product: ", error);
            throw error;
        }
    }
}   