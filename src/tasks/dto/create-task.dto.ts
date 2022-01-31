import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'task',
    description: 'task title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '1',
    description: 'task order',
  })
  @IsNumber()
  order: number;

  @ApiProperty({
    example: 'task one',
    description: 'task description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    examples: ['887c6afa-c641-4226-b137-c0eea5125903', null],
    description: 'task userId or null',
  })
  @IsOptional()
  @IsString()
  userId: string;

  @ApiProperty({
    examples: ['887c6afa-c641-4226-b137-c0eea5125903', null],
    description: 'task boardId or null',
  })
  @IsOptional()
  @IsString()
  boardId: string;

  @ApiProperty({
    examples: ['887c6afa-c641-4226-b137-c0eea5125903', null],
    description: 'task columnId or null',
  })
  @IsOptional()
  @IsString()
  columnId: string;
}
