import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { Email: createUserDto.Email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.Password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      Password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async getAllUsers(page: number = 1, limit: number = 10): Promise<User[]> {
    const [users] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { UserId: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { UserId: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (updateUserDto.Password) {
      updateUserDto.Password = await bcrypt.hash(updateUserDto.Password, 10);
    }
    await this.usersRepository.update(userId, updateUserDto);
    return this.usersRepository.findOne({ where: { UserId: userId } });
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { UserId: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    await this.usersRepository.delete(userId);
  }
}
