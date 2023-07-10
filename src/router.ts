import { Router } from "express";
import { ProductControllerImpl } from "./app/controllers/ProductControllerImpl";
import { RestaurantControllerImpl } from "./app/controllers/RestaurantControllerImpl";
import { container } from "./config/inversify.config";
import 'reflect-metadata';

const router: Router = Router()

const productControllerImpl = container.resolve(ProductControllerImpl);
const restaurantControllerImpl = container.resolve(RestaurantControllerImpl);


// Routes

router.get("/products", productControllerImpl.getProducts);

router.post("/products",productControllerImpl.createProduct);

// router.get("/products/:productID",partnerControllerImpl.getProduct(productID: string))

router.put("/products",productControllerImpl.updateProduct);

router.delete("/products/:productID",productControllerImpl.deleteProduct);

router.get("/restaurants", restaurantControllerImpl.getRestaurants);

router.post("/restaurants",restaurantControllerImpl.createRestaurant);

// router.get("/restaurants/:restaurantID",restaurantControllerImpl.getRestaurant(restaurantID: string))

router.put("/restaurants", restaurantControllerImpl.updateRestaurant);

router.delete("/restaurants/:restaurandID",restaurantControllerImpl.deleteRestaurant);

export { router };  