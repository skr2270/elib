import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto, LoginResponseDto } from './users.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @Query(() => [User])
  async getAllUsers(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
  ): Promise<User[]> {
    return this.usersService.getAllUsers(page, limit);
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

  @Mutation(() => LoginResponseDto)
async login(
  @Args('email') email: string,
  @Args('password') password: string,
): Promise<LoginResponseDto> {
  return this.usersService.login(email, password);
}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getMe(@Args('userId') userId: number): Promise<User> {
    return this.usersService.getUserById(userId);
  }
}
