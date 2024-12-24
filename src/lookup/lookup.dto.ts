import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CountryDto {
  @Field(() => Int)
  CountryId: number;

  @Field()
  CountryName: string;
}

@ObjectType()
export class StateDto {
  @Field(() => Int)
  StateId: number;

  @Field()
  StateName: string;
}

@ObjectType()
export class SchoolDistrictDto {
  @Field(() => Int)
  SchoolDistrictId: number;

  @Field()
  SchoolDistrictName: string;
}
