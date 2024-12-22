import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(userId: number): Promise<User> {
    return this.usersRepository.findOne({ where: { UserId: userId } });
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(userId, updateUserDto);
    return this.usersRepository.findOne({ where: { UserId: userId } });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}
