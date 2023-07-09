import { inject,injectable } from 'inversify';
import { DatabaseConnection } from '../database/DatabaseConnection';
import { Connection, MysqlError } from 'mysql';
import { Restaurant } from '../models/Restaurant';
import 'reflect-metadata';

@injectable()
export class RestaurantDAO {
    private dbConnection: Connection;

    constructor(@inject(DatabaseConnection) dbConnection: DatabaseConnection) {
        this.dbConnection = dbConnection.getConnection();
    }

    public getRestaurants(): Promise<Restaurant[]> {
        return new Promise((resolve, reject) => {
            let queryString: string = "SELECT * FROM restaurants";
            this.dbConnection.query(queryString, (error: MysqlError | null, results: Restaurant[]) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
}