import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Query(() => User)
  async getUserById(@Args('userId') userId: number): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto
  ): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: number,
    @Args('updateUserDto') updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('userId') userId: number): Promise<boolean> {
    await this.usersService.deleteUser(userId);
    return true;
  }
}
