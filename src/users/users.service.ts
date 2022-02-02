import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { Task } from 'src/tasks/entities/task.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    @InjectModel(Task) private tasksRepository: typeof Task, // private sequelize: Sequelize,
  ) {}

  async createAdmin(createUserDto: CreateUserDto) {
    const salt = process.env.SALT_HASH_PASSWORD;
    const hashPassword = await bcrypt.hash(createUserDto.password, +salt);
    if (!(await this.getUserByLogin(createUserDto.login))) {
      await this.usersRepository.create({
        ...createUserDto,
        password: hashPassword,
      });
    }
  }

  async create(createUserDto: CreateUserDto) {
    const salt = process.env.SALT_HASH_PASSWORD;
    const hashPassword = await bcrypt.hash(createUserDto.password, +salt);

    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    return this.usersRepository.toResponse(user);
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users.map((user) => this.usersRepository.toResponse(user));
  }

  async findOne(id: string) {
    const userOne = await this.usersRepository.findOne({ where: { id } });
    if (userOne) {
      return this.usersRepository.toResponse(userOne);
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

    await this.usersRepository.update(
      { ...updateUserDto, password: hashPassword },
      { where: { id } },
    );
    const userUpdate = await this.usersRepository.findOne({ where: { id } });
    return this.usersRepository.toResponse(userUpdate);
  }

  async remove(id: string) {
    await this.usersRepository.destroy({
      restartIdentity: true,
      where: { id },
    });
    await this.tasksRepository.update(
      { userId: null },
      { where: { userId: id } },
    );
  }
}
