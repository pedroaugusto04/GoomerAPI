import { inject, injectable } from 'inversify';
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
            let queryString: string = "INSERT INTO restaurants (id,name,address,photo,opening_time,closing_time) VALUES (?,?,?,?,?,?)"
            let values = [restaurant.id, restaurant.name, restaurant.address, restaurant.photo, restaurant.opening_time, restaurant.closing_time];
            this.dbConnection.query(queryString, values, (error: MysqlError | null) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
            });
        })
    }

    public getRestaurant(restaurant_id: string): Promise<IRestaurant> {
        return new Promise((resolve, reject) => {
            let queryString: string = "SELECT * FROM restaurants WHERE id = ?";
            let values = [restaurant_id]
            this.dbConnection.query(queryString,values, (error: MysqlError | null, result: IRestaurant) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
                resolve(result);
            });
        });
    }


    public updateRestaurant(restaurant: IRestaurant): Promise<IRestaurant> {
        return new Promise((resolve, reject) => {
            let queryString: string = "UPDATE restaurants SET name = ?, address = ?, photo = ?, opening_time = ?, closing_time = ? WHERE id = ?";
            let values = [restaurant.name, restaurant.address, restaurant.photo, restaurant.opening_time, restaurant.closing_time, restaurant.id];
            this.dbConnection.query(queryString, values, (error: MysqlError | null, result) => {
                if (result.affectedRows == 0) reject(new Error("Restaurant doesn't exist"));
                if (error) {
                    console.error("Failed to execute query:", error)
                    reject(error);
                    return;
                }
                resolve(restaurant);
            })
        })
    }

    public deleteRestaurant(restaurant_id: String): Promise<void> {
        return new Promise((resolve, reject) => {
            let queryString: string = "DELETE FROM restaurants WHERE id = ?";
            let values = [restaurant_id]
            this.dbConnection.query(queryString, values, (error: MysqlError | null, results) => {
                if (results.affectedRows == 0) reject(new Error("Restaurant doesn't exist"));
                if (error) {
                    console.error("Failed to execute query:", error)
                    reject(error);
                    return;
                }
                resolve();
            })
        })
    }
}