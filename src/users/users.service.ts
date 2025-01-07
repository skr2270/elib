import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto, LoginResponseDto } from './users.dto';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
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

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.usersRepository.findOne({ where: { Email: email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const access_token = await this.authService.generateToken(user.UserId, user.Email);
    return { access_token };
  }
}
