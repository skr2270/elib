import { Resolver, Query } from '@nestjs/graphql';
import { DatabaseService } from './database/database.service';

@Resolver()
export class AppResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello, GraphQL!';
  }

  @Query(() => String)
  async getSchema(): Promise<string> {
    try {
      const schema = await this.databaseService.getTableSchema();
      return JSON.stringify(schema, null, 2);
    } catch (error) {
      console.error('Error fetching schema:', error);
      return 'Failed to fetch schema.';
    }
  }
}
