import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IColumn } from '../interfaces/column-interface';

export class CreateBoardDto {
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
