import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IColumn } from '../interfaces/column-interface';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({
    example: 'board',
    description: 'board title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: `[
      { "title": "Backlog", "order": 1 }, 
      { "title": "Sprint", "order": 2 }
    ]`,
    description: 'array columns',
  })
  @IsArray()
  columns: IColumn[];
}
