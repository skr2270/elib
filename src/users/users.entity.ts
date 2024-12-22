import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('tblusers')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  UserId: number;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  FirstName: string;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  LastName: string;

  @Column({ type: 'varchar', length: 128, unique: true })
  @Field()
  Email: string;

  @Column({ type: 'varchar', length: 256 })
  @Field()
  Password: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  UserType: number;

  @Column({ type: 'bit', default: 1 })
  @Field()
  IsActive: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  CreatedDate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  UpdatedDate: Date;
}
