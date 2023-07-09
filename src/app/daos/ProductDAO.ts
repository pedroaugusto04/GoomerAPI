import { inject, injectable } from 'inversify';
import { DatabaseConnection } from '../database/DatabaseConnection';
import { Connection, MysqlError } from 'mysql';
import { Product } from '../models/Product';
import 'reflect-metadata';

@injectable()
export class ProductDAO {
    private dbConnection: Connection;

    constructor(@inject(DatabaseConnection) dbConnection: DatabaseConnection) {
        this.dbConnection = dbConnection.getConnection();
    }

    public getProducts(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            let queryString: string = "SELECT * FROM products";
            this.dbConnection.query(queryString, (error: MysqlError | null, results: Product[]) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
                resolve(results)
            });
        });
    }
}