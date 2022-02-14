import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { setHashPassword } from 'src/bcrypt/bcrypt.hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  async create(createUserDto: CreateUserDto) {
    if (!(await this.getUserByLogin(createUserDto.login))) {
      const user = await this.usersRepository.save({
        ...createUserDto,
        password: await setHashPassword(createUserDto.password),
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
    await this.usersRepository.update(id, {
      ...updateUserDto,
      password: await setHashPassword(updateUserDto.password),
    });
    const userUpdate = await this.usersRepository.findOne({ where: { id } });
    return this.toResponse(userUpdate);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}
