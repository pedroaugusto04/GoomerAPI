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

    public getProducts(): Promise<IProduct[]> {
        return new Promise((resolve, reject) => {
            let queryString: string = "SELECT * FROM products";
            this.dbConnection.query(queryString, (error: MysqlError | null, results: IProduct[]) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
                resolve(results)
            })
        })
    }

    public createProduct(product: IProduct): Promise<IProduct> {
        return new Promise((resolve, reject) => {
            let queryString: string = "INSERT INTO products (id,name,price,photo,category) VALUES (?,?,?,?,?)"
            let values = [product.id, product.name, product.price, product.photo, product.category];
            this.dbConnection.query(queryString, values, (error: MysqlError | null) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
            });
            queryString = "SELECT * FROM products WHERE id = ?";
            values = [product.id];
            this.dbConnection.query(queryString, values, (error: MysqlError | null, results: IProduct) => {
                if (error) {
                    console.error('Failed to execute query:', error);
                    reject(error);
                    return;
                }
                resolve(results)
            })
        })
    }

    public updateProduct(product: IProduct): Promise<IProduct> {
        return new Promise((resolve,reject) => {
            let queryString: string = "UPDATE products SET name = ?, price = ?, photo = ?, category = ? WHERE id = ?";
            let values = [product.name,product.price,product.photo,product.category,product.id];
            this.dbConnection.query(queryString,values,(error: MysqlError | null, result) => {
                if (result.affectedRows == 0) reject(new Error("Product doesn't exist"));
                if (error){
                    console.error("Failed to execute query:", error)
                    reject(error);
                    return;
                }
                resolve(product);
            })
        })
    }

    public deleteProduct(productID: String): Promise<void> {
        return new Promise((resolve,reject) => {
            let queryString: string = "DELETE FROM products WHERE id = ?";
            let values = [productID]
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