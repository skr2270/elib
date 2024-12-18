import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Column {
  @Field()
  columnName: string;

  @Field()
  dataType: string;

  @Field()
  isNullable: string;
}

@ObjectType()
export class Table {
  @Field()
  tableName: string;

  @Field(() => [Column])
  columns: Column[];
}
