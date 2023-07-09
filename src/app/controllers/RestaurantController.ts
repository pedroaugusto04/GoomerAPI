import { Request, Response } from "express";
import { RestaurantServiceImpl } from "../services/RestaurantServiceImpl";
import { inject, injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export class RestaurantController{

  private restaurantServiceImpl: RestaurantServiceImpl;

  constructor(@inject(RestaurantServiceImpl) restaurantServiceImpl: RestaurantServiceImpl) {
    this.restaurantServiceImpl = restaurantServiceImpl;
  }

  public getRestaurants = (req: Request, res: Response): void => {
    try {
      const restaurants = this.restaurantServiceImpl.getRestaurants();
      res.json(restaurants);
    } catch (error) {
      console.error('Failed to get restaurants:', error);
      res.status(500).json({ error: 'Failed to get products' });
    }
  };
}