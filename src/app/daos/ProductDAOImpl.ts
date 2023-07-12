import { inject, injectable } from 'inversify';
import { DatabaseConnection } from '../database/DatabaseConnection';
import { Connection, MysqlError } from 'mysql';
import { IProduct } from '../models/IProduct';
import { ProductDAO } from './ProductDAO';
import 'reflect-metadata';

@injectable()
export class ProductDAOImpl implements ProductDAO {
    private dbConnection: Connection;

    constructor(@inject(DatabaseConnection) dbConnection: DatabaseConnection) {
        this.dbConnection = dbConnection.getConnection();
    }

    public getProducts(restaurant_id: string): Promise<IProduct[]> {
        return new Promise((resolve, reject) => {
            let queryString: string = "SELECT * FROM products WHERE id IN" +
                "( SELECT product_id from restaurant_product WHERE restaurant_id  = ?)"
            let values = [restaurant_id]
            this.dbConnection.query(queryString, values, (error: MysqlError | null, results: IProduct[]) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
                resolve(results)
            })
        })
    }

    public createProduct(restaurant_id: string, product: IProduct): Promise<IProduct> {
        return new Promise((resolve, reject) => {
            let queryString: string = "INSERT INTO products (id,name,price,photo,category) VALUES (?,?,?,?,?);"
            let values = [product.id, product.name, product.price, product.photo, product.category];
            this.dbConnection.query(queryString, values, (error: MysqlError | null) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
            });
            queryString = "INSERT INTO restaurant_product (product_id, restaurant_id) VALUES (?,?)";
            values = [product.id, restaurant_id];
            this.dbConnection.query(queryString, values, (error: MysqlError | null) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
            });

            resolve(product);
        })
    }

    public updateProduct(product: IProduct, product_id: string): Promise<IProduct> {
        return new Promise((resolve, reject) => {
            let queryString: string = "UPDATE products SET name = ?, price = ?, photo = ?, category = ? WHERE id = ?";
            let values = [product.name, product.price, product.photo, product.category, product_id];
            this.dbConnection.query(queryString, values, (error: MysqlError | null, result) => {
                if (error) {
                    console.error("Failed to execute query:", error)
                    reject(error);
                    return;
                }
                if (result.affectedRows == 0) reject(new Error("Product doesn't exist"));
                resolve(product);
            })
        })
    }

    public deleteProduct(product_id: String): Promise<void> {
        return new Promise((resolve, reject) => {
            let queryString: string = "DELETE FROM restaurant_product where product_id = ?;";
            let values = [product_id];
            this.dbConnection.query(queryString, values, (error: MysqlError | null, result) => {
                if (error) {
                    console.error("Failed to execute query:", error)
                    reject(error);
                    return;
                }
                if (result.affectedRows == 0) reject(new Error("Product doesn't exist"));
            })
            queryString = "DELETE FROM products WHERE id = ?;"
            values = [product_id]
            this.dbConnection.query(queryString, values, (error: MysqlError | null, result) => {
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