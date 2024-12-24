import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity({ schema: 'dbo', name: 'tblCountry' })
export class Country {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  CountryId: number;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  CountryName: string;
}
