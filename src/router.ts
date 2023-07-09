import { Router } from "express";
import { ProductController } from "./app/controllers/ProductController";
import { RestaurantController } from "./app/controllers/RestaurantController";
import { container } from "./config/inversify.config";
import 'reflect-metadata';

const router: Router = Router()

const productController = container.resolve(ProductController);
const restaurantController = container.resolve(RestaurantController);


//Routes
router.get("/products", productController.getProducts);

router.get("/restaurants", restaurantController.getRestaurants);

export { router };