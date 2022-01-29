import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signToken(@Body() createAuthDto: CreateAuthDto) {
    const token = await this.authService.generateToken(createAuthDto);

    if (!token) {
      throw new HttpException(
        'Wrong login/password combination!',
        HttpStatus.FORBIDDEN,
      );
    } else {
      return { token };
    }
  }
}
