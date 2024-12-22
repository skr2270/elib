import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  FirstName: string;

  @Field()
  LastName: string;

  @Field()
  Email: string;

  @Field()
  Password: string;

  @Field()
  UserType: number;
}

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  FirstName?: string;

  @Field({ nullable: true })
  LastName?: string;

  @Field({ nullable: true })
  Email?: string;

  @Field({ nullable: true })
  Password?: string;

  @Field({ nullable: true })
  UserType?: number;

  @Field({ nullable: true })
  IsActive?: boolean;
}
