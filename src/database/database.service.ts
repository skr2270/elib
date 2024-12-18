import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

    // Fetch all tables from the connected MSSQL database
    async getAllTables(): Promise<string[]> {
        const query = `
            SELECT TABLE_NAME
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_TYPE = 'BASE TABLE';
        `;
        const result = await this.dataSource.query(query);
        return result.map(row => row.TABLE_NAME);
    }

    // Fetch all columns for each table in the database using dynamic SQL
    async getTableColumns(tableName: string): Promise<any[]> {
        const query = `
            SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = @tableName
        `;
        
        // Pass the parameter as an object for named parameter binding
        const result = await this.dataSource.query(query, [ { tableName } ]);
        return result;
    }
        

    // Fetch the schema details for all tables
    async getTableSchema(): Promise<any> {
        const tables = await this.getAllTables();
        const schema = {};

        for (const table of tables) {
            const columns = await this.getTableColumns(table);
            schema[table] = columns;
        }

        return schema;
    }
}
