import { Restaurant } from "../models/Restaurant";
import { RestaurantDAO } from "../daos/RestaurantDAO";
import { inject, injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export class RestaurantServiceImpl {

    private restaurantDAO: RestaurantDAO;

    constructor(@inject(RestaurantDAO) restaurantDAO: RestaurantDAO) {
        this.restaurantDAO = restaurantDAO;
    }

    public async getRestaurants(): Promise<Restaurant[]> {
        try {
            const restaurants: Restaurant[] = await this.restaurantDAO.getRestaurants();
            return restaurants;
        } catch (error) {
            console.error('Failed to get products:', error);
            throw error;
        }
    }
}   