import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  UserId: number;

  @Field()
  FirstName: string;

  @Field()
  MiddleName: string;

  @Field()
  LastName: string;

  @Field()
  Email: string;

  @Field()
  Password: string;

  @Field()
  UserType: number;

  @Field()
  IsActive: boolean;
}
