import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToken(createAuthDto: CreateAuthDto) {
    if (!(createAuthDto?.login && createAuthDto?.password)) {
      return null;
    }
    const { login, password } = createAuthDto;

    const userAdmin = await this.usersService.getUserByLogin(login);

    if (!userAdmin) {
      return null;
    }

    if (!(await this.checkHashPassword(password, userAdmin))) {
      return null;
    } else {
      const { id, login } = userAdmin;
      const payload = { id, login };
      const token = this.jwtService.sign(payload);

      return token;
    }
  }

  private async checkHashPassword(password: string, user: CreateAuthDto) {
    const validPassword = await bcrypt.compare(password, user.password);

    return validPassword;
  }
}
