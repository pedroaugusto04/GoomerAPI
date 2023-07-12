import { IRestaurant } from "../models/IRestaurant";
import {Request,Response} from "express";

export interface RestaurantController{

    getRestaurants(req: Request,res: Response): Promise<void>;

    createRestaurant(req: Request,res: Response): Promise<void>;
    
    getRestaurant(req: Request,res: Response): Promise<void>;

    updateRestaurant(req: Request,res: Response): Promise<void>;

    deleteRestaurant(req: Request,res: Response): Promise<void>;
}