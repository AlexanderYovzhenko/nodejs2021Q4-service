import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
  // ValidationPipe,
  NotFoundException,
  HttpStatus,
  UseFilters,
  ParseUUIDPipe,
  // UsePipes,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { AllExceptionsFilter } from 'src/exception-filters/all-exceptions.filter';
// import { JoiValidationPipe } from 'src/pipes/validation.pipe';

@UseGuards(AuthGuard)
@UseFilters(AllExceptionsFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UsePipes(new JoiValidationPipe(createCatSchema))
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    if (await this.usersService.findOne(id)) {
      return await this.usersService.findOne(id);
    } else {
      throw new NotFoundException('User not found!');
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,

    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (await this.usersService.findOne(id)) {
      return await this.usersService.update(id, updateUserDto);
    } else {
      throw new NotFoundException('User not found!');
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    if (await this.usersService.findOne(id)) {
      await this.usersService.remove(id);
    } else {
      throw new NotFoundException('User not found!');
    }
  }
}
