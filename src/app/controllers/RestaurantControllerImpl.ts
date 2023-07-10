import { Request, Response } from "express";
import { RestaurantServiceImpl } from "../services/RestaurantServiceImpl";
import { RestaurantService } from "../services/RestaurantService";
import { inject, injectable } from "inversify";
import { IRestaurant } from "../models/IRestaurant";
import 'reflect-metadata';

@injectable()
export class RestaurantControllerImpl{

  private restaurantServiceImpl: RestaurantService;

  constructor(@inject(RestaurantServiceImpl) restaurantServiceImpl: RestaurantService) {
    this.restaurantServiceImpl = restaurantServiceImpl;
  }

  public getRestaurants = (req: Request, res: Response): void => {
    try {
      const restaurants = this.restaurantServiceImpl.getRestaurants();
      res.json(restaurants);
    } catch (error) {
      console.error('Failed to get restaurants.', error);
      res.status(500).json({ error: 'Failed to get restaurants.' });
    }
  };

  public createRestaurant = async(req: Request, res:Response): Promise<void> => {
    const restaurant: IRestaurant = req.body;
    try {
      const restaurantRes = await this.restaurantServiceImpl.createRestaurant(restaurant);
      res.status(201).json(restaurantRes);
    } catch (error) { 
      console.error('Failed to create restaurant.', error);
      res.status(500).json({ error: 'Failed to create restaurant.' });
    }
  }

  public updateRestaurant = async(req: Request, res: Response): Promise<void> => {
    const restaurant: IRestaurant = req.body;
    try {
      const restaurantRes = await this.restaurantServiceImpl.updateRestaurant(restaurant);
      res.json(restaurantRes);
    } catch (error) { 
      console.error('Failed to update restaurant.', error);
      res.status(500).json({ error: 'Failed to update restaurant.' });
    }
  }

  public deleteRestaurant = async(req: Request, res: Response): Promise<void> => {
    const restaurantID: string = req.params.restaurantID;
    try {
      await this.restaurantServiceImpl.deleteRestaurant(restaurantID);
      res.status(204).json();
    } catch (error) { 
      console.error('Failed to delete restaurant.', error);
      res.status(500).json({ error: 'Failed to delete restaurant.' });
    }
  }
}