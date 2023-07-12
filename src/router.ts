import { Router } from "express";
import { ProductControllerImpl } from "./app/controllers/ProductControllerImpl";
import { RestaurantControllerImpl } from "./app/controllers/RestaurantControllerImpl";
import { container } from "./config/inversify.config";
import 'reflect-metadata';

const router: Router = Router()

const productControllerImpl = container.resolve(ProductControllerImpl);
const restaurantControllerImpl = container.resolve(RestaurantControllerImpl);


// Routes

router.get("/restaurants/:restaurant_id/products", productControllerImpl.getProducts);

router.post("/restaurants/:restaurant_id/products",productControllerImpl.createProduct);

router.put("/restaurants/:restaurant_id/products/:product_id",productControllerImpl.updateProduct);

router.delete("/restaurants/:restaurants_id/products/:product_id",productControllerImpl.deleteProduct);

router.get("/restaurants", restaurantControllerImpl.getRestaurants);

router.post("/restaurants",restaurantControllerImpl.createRestaurant);

router.get("/restaurants/:restaurant_id",restaurantControllerImpl.getRestaurant)

router.put("/restaurants/:restaurant_id", restaurantControllerImpl.updateRestaurant);

router.delete("/restaurants/:restaurant_id",restaurantControllerImpl.deleteRestaurant);

export { router };  