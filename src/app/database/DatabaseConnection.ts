import mysql, { Connection } from 'mysql';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class DatabaseConnection {
  private connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Root@123',
      database: 'GoomerDb',
    });

    this.connection.connect((error) => {
      if (error) {
        console.log('Connection failed!', error);
      }
    });
  }

  public getConnection(): Connection {
    return this.connection;
  }
} 