import { inject,injectable } from 'inversify';
import { DatabaseConnection } from '../database/DatabaseConnection';
import { Connection, MysqlError } from 'mysql';
import { IRestaurant } from '../models/IRestaurant';
import { RestaurantDAO } from './RestaurantDAO';
import 'reflect-metadata';

@injectable()
export class RestaurantDAOImpl implements RestaurantDAO {
    private dbConnection: Connection;

    constructor(@inject(DatabaseConnection) dbConnection: DatabaseConnection) {
        this.dbConnection = dbConnection.getConnection();
    }

    public getRestaurants(): Promise<IRestaurant[]> {
        return new Promise((resolve, reject) => {
            let queryString: string = "SELECT * FROM restaurants";
            this.dbConnection.query(queryString, (error: MysqlError | null, results: IRestaurant[]) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    
    public createRestaurant(restaurant: IRestaurant): Promise<IRestaurant> {
        return new Promise((resolve, reject) => {
            let queryString: string = "INSERT INTO restaurants (name,address,photo) VALUES (?,?,?)"
            let values = [restaurant.name,restaurant.address,restaurant.photo];
            this.dbConnection.query(queryString, values, (error: MysqlError | null) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
            });
            queryString = "SELECT * FROM restaurants WHERE id = ?";
            values = [restaurant.id];
            this.dbConnection.query(queryString, values, (error: MysqlError | null, results: IRestaurant) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
                resolve(results)
            })
        })
    }

    
    public updateRestaurant(restaurant: IRestaurant): Promise<IRestaurant> {
        return new Promise((resolve,reject) => {
            let queryString: string = "UPDATE restaurants SET name = ?, address = ?, photo = ? WHERE id = ?";
            let values = [restaurant.name,restaurant.address,restaurant.photo,restaurant.id];
            this.dbConnection.query(queryString,values,(error: MysqlError | null, result) => {
                if (result.affectedRows == 0) reject(new Error("Restaurant doesn't exist"));
                if (error){
                    console.error("Failed to execute query:", error)
                    reject(error);
                    return;
                }
                resolve(restaurant);
            })
        })
    }

    public deleteRestaurant(restaurantID: String): Promise<void> {
        return new Promise((resolve,reject) => {
            let queryString: string = "DELETE FROM restaurants WHERE id = ?";
            let values = [restaurantID]
            this.dbConnection.query(queryString,values,(error: MysqlError | null,results) => {
                if (results.affectedRows == 0) reject(new Error("Product doesn't exist"));
                if (error){
                    console.error("Failed to execute query:", error)
                    reject(error);
                    return;
                }
                resolve();
            })
        })
    }
}