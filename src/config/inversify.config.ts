import { Container } from 'inversify';
import { DatabaseConnection } from '../app/database/DatabaseConnection';
import { RestaurantDAO } from '../app/daos/RestaurantDAO';
import { ProductDAO } from '../app/daos/ProductDAO';
import { ProductController } from '../app/controllers/ProductController';
import { RestaurantController } from '../app/controllers/RestaurantController';
import { ProductServiceImpl } from '../app/services/ProductServiceImpl';
import { RestaurantServiceImpl } from '../app/services/RestaurantServiceImpl';
import 'reflect-metadata';

const container = new Container();

container.bind(DatabaseConnection).toSelf();
container.bind(RestaurantDAO).toSelf();
container.bind(ProductDAO).toSelf();
container.bind(ProductController).toSelf();
container.bind(RestaurantController).toSelf();
container.bind(ProductServiceImpl).toSelf();
container.bind(RestaurantServiceImpl).toSelf();
export { container };