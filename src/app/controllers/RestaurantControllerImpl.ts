import { Request, Response } from "express";
import { RestaurantServiceImpl } from "../services/RestaurantServiceImpl";
import { RestaurantService } from "../services/RestaurantService";
import { inject, injectable } from "inversify";
import { IRestaurant } from "../models/IRestaurant";
import { RestaurantController } from "./RestaurantController";
import 'reflect-metadata';

@injectable()
export class RestaurantControllerImpl implements RestaurantController {

  private restaurantServiceImpl: RestaurantService;

  constructor(@inject(RestaurantServiceImpl) restaurantServiceImpl: RestaurantService) {
    this.restaurantServiceImpl = restaurantServiceImpl;
  }

  async getRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const restaurants = await this.restaurantServiceImpl.getRestaurants();
      res.json(restaurants);
    } catch (error) {
      console.error('Failed to get restaurants.', error);
      res.status(500).json({ error: 'Failed to get restaurants.' });
    }
  };

  async createRestaurant(req: Request, res: Response): Promise<void> {
    const restaurant: IRestaurant = req.body;
    try {
      const restaurantRes = await this.restaurantServiceImpl.createRestaurant(restaurant);
      res.status(201).json(restaurantRes);
    } catch (error) {
      console.error('Failed to create restaurant.', error);
      res.status(500).json({ error: 'Failed to create restaurant.' });
    }
  }

  async getRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const restaurant = await this.restaurantServiceImpl.getRestaurant(req.params.restaurant_id);
      res.json(restaurant);
    } catch (error) {
      console.error('Failed to get restaurant.', error);
      res.status(500).json({ error: 'Failed to get restaurant' });
    }
  }

  async updateRestaurant(req: Request, res: Response): Promise<void> {
    const restaurant: IRestaurant = req.body;
    try {
      const restaurantRes = await this.restaurantServiceImpl.updateRestaurant(restaurant);
      res.json(restaurantRes);
    } catch (error) {
      console.error('Failed to update restaurant.', error);
      res.status(500).json({ error: 'Failed to update restaurant.' });
    }
  }

  async deleteRestaurant(req: Request, res: Response): Promise<void> {
    const restaurant_id: string = req.params.restaurant_id;
    try {
      await this.restaurantServiceImpl.deleteRestaurant(restaurant_id);
      res.status(204).json();
    } catch (error) {
      console.error('Failed to delete restaurant.', error);
      res.status(500).json({ error: 'Failed to delete restaurant.' });
    }
  }

}