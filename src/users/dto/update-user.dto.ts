import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'alex',
    description: 'name user',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'admin',
    description: 'login user',
  })
  @IsString()
  login: string;

  @ApiProperty({
    example: '12345',
    description: 'password user',
  })
  @IsString()
  password: string;
}
