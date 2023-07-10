import { Container } from 'inversify';
import { DatabaseConnection } from '../app/database/DatabaseConnection';
import { RestaurantDAOImpl } from '../app/daos/RestaurantDAOImpl';
import { ProductDAOImpl } from '../app/daos/ProductDAOImpl';
import { ProductControllerImpl } from '../app/controllers/ProductControllerImpl';
import { RestaurantControllerImpl} from '../app/controllers/RestaurantControllerImpl';
import { ProductServiceImpl } from '../app/services/ProductServiceImpl';
import { RestaurantServiceImpl } from '../app/services/RestaurantServiceImpl';
import 'reflect-metadata';

const container = new Container();

container.bind(DatabaseConnection).toSelf();
container.bind(RestaurantDAOImpl).toSelf();
container.bind(ProductDAOImpl).toSelf();
container.bind(ProductControllerImpl).toSelf();
container.bind(RestaurantControllerImpl).toSelf();
container.bind(ProductServiceImpl).toSelf();
container.bind(RestaurantServiceImpl).toSelf();
export { container };