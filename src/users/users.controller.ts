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
  NotFoundException,
  HttpStatus,
  UseFilters,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { AllExceptionsFilter } from 'src/exception-filters/all-exceptions.filter';

@ApiTags('Users')
@ApiHeader({
  name: 'header',
  description: 'Authorization Bearer token',
  schema: {
    type: 'string',
    default: 'Bearer token',
  },
})
@UseGuards(AuthGuard)
@UseFilters(AllExceptionsFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({
    status: 201,
    type: CreateUserDto,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: [CreateUserDto] })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    if (await this.usersService.findOne(id)) {
      return await this.usersService.findOne(id);
    } else {
      throw new NotFoundException('User not found!');
    }
  }

  @ApiOperation({ summary: 'update user by id' })
  @ApiResponse({ status: 200, type: UpdateUserDto })
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

  @ApiOperation({ summary: 'delete user by id' })
  @ApiResponse({ status: 204 })
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
