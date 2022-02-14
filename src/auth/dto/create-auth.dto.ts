import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    example: 'admin',
    description: 'user login',
  })
  @IsString()
  login: string;

  @ApiProperty({
    example: 'admin',
    description: 'user password',
  })
  @IsString()
  password: string;
}
