import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Register a new user (Student, Parent, Teacher)
  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userType: number,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: hashedPassword,
      UserType: userType,
    });

    return this.userRepository.save(newUser);
  }

  // Get user by ID
  async getUser(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { UserId: userId } });
  }

  // Validate user's password during login
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
