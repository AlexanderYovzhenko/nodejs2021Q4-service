import {
  Controller,
  Post,
  Body,
  ForbiddenException,
  UseFilters,
} from '@nestjs/common';
import { AllExceptionsFilter } from 'src/exception-filters/all-exceptions.filter';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@UseFilters(AllExceptionsFilter)
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signToken(@Body() createAuthDto: CreateAuthDto) {
    const token = await this.authService.generateToken(createAuthDto);

    if (!token) {
      throw new ForbiddenException('Wrong login/password combination!');
    } else {
      return { token };
    }
  }
}
