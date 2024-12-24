import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Country } from './country.entity';

@ObjectType()
@Entity({ schema: 'dbo', name: 'tblState' })
export class State {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  StateId: number;

  @Column({ type: 'varchar', length: 100 })
  @Field()
  StateName: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'CountryId' })
  @Field(() => Country)
  Country: Country;

  @Column({ type: 'int' })
  CountryId: number;
}
