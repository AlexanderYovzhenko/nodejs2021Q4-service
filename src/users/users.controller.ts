import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  Res,
  HttpStatus,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.usersService.findOne(id)) {
      return await this.usersService.findOne(id);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('User not found!');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (await this.usersService.findOne(id)) {
      return await this.usersService.update(id, updateUserDto);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('User not found!');
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.usersService.findOne(id)) {
      console.log(await this.usersService.remove(id));

      await this.usersService.remove(id);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('User not found!');
    }
  }
}
