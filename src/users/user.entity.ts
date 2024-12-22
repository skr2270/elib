import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tblusers')
export class User {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column({ type: 'varchar', length: 50 })
  FirstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  MiddleName: string;

  @Column({ type: 'varchar', length: 50 })
  LastName: string;

  @Column({ type: 'varchar', length: 128 })
  Email: string;

  @Column({ type: 'varchar', length: 256 })
  Password: string;

  @Column({ type: 'int' })
  UserType: number; // 0: Student, 1: Parent, 2: Teacher, etc.

  @Column({ type: 'bit', default: 1 })
  IsActive: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  UpdatedDate: Date;
}
