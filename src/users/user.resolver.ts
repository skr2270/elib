import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Mutation for registering a user (Student, Parent, Teacher)
  @Mutation(() => User)
  async registerUser(
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('userType') userType: number,
  ): Promise<User> {
    return this.usersService.registerUser(firstName, lastName, email, password, userType);
  }

  // Query to fetch user details by ID
  @Query(() => User)
  async getUser(@Args('userId') userId: number): Promise<User> {
    return this.usersService.getUser(userId);
  }
}
