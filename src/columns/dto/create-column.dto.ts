import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({
    example: 'column',
    description: 'column title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 1,
    description: 'column order',
  })
  @IsNumber()
  order: number;
}
