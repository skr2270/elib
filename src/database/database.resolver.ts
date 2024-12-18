import { Resolver, Query, Args } from '@nestjs/graphql';
import { DatabaseService } from './database.service';
import { Table, Column } from './types';

@Resolver()
export class DatabaseResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  // Query to fetch all table names
  @Query(() => [String])
  async getAllTables(): Promise<string[]> {
    return await this.databaseService.getAllTables();
  }

  // Query to fetch columns of a specific table
  @Query(() => [Column])
  async getTableColumns(@Args('tableName') tableName: string): Promise<Column[]> {
    const columns = await this.databaseService.getTableColumns(tableName);
    return columns.map(col => ({
      columnName: col.COLUMN_NAME,
      dataType: col.DATA_TYPE,
      isNullable: col.IS_NULLABLE,
    }));
  }

  // Query to fetch all tables and their schema (columns)
  @Query(() => [Table])
  async getTableSchema(): Promise<Table[]> {
    const schema = await this.databaseService.getTableSchema();
    return Object.keys(schema).map(tableName => {
      return {
        tableName,
        columns: schema[tableName]?.map(col => ({
          columnName: col.COLUMN_NAME,
          dataType: col.DATA_TYPE,
          isNullable: col.IS_NULLABLE,
        })) || [],
      };
    });
  }
}
