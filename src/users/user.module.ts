import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from '../users/user.resolver';
import { UsersService } from '../users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    GraphQLModule,
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
