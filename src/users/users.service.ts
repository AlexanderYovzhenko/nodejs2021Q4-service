import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const salt = process.env.SALT_HASH_PASSWORD;
    const hashPassword = await bcrypt.hash(createUserDto.password, +salt);
    if (!(await this.getUserByLogin(createUserDto.login))) {
      await this.usersRepository.save({
        ...createUserDto,
        password: hashPassword,
      });
    } else {
      return null;
    }
  }

  async create(createUserDto: CreateUserDto) {
    const salt = process.env.SALT_HASH_PASSWORD;
    const hashPassword = await bcrypt.hash(createUserDto.password, +salt);

    if (!(await this.getUserByLogin(createUserDto.login))) {
      const user = await this.usersRepository.save({
        ...createUserDto,
        password: hashPassword,
      });
      return this.toResponse(user);
    } else {
      throw new ConflictException('Login already exists!');
    }
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => this.toResponse(user));
  }

  async findOne(id: string) {
    const userOne = await this.usersRepository.findOne({ where: { id } });
    if (userOne) {
      return this.toResponse(userOne);
    } else {
      return null;
    }
  }

  async getUserByLogin(login: string) {
    const userAdmin = this.usersRepository.findOne({ where: { login: login } });
    return userAdmin;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const salt = process.env.SALT_HASH_PASSWORD;
    const hashPassword = await bcrypt.hash(updateUserDto.password, +salt);

    await this.usersRepository.update(id, {
      ...updateUserDto,
      password: hashPassword,
    });
    const userUpdate = await this.usersRepository.findOne({ where: { id } });
    return this.toResponse(userUpdate);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}
