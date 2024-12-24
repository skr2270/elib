import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity({ schema: 'dbo', name: 'tblSchoolDistrict' })
export class SchoolDistrict {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  Id: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  SchoolDistrictId: number;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  SchoolDistrictName: string;
}
