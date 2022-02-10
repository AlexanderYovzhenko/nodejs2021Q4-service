import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ColumnBoard } from 'src/columns/entities/column.entity';

export class CreateBoardDto {
  @ApiProperty({
    example: 'board',
    description: 'board title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: `[
      { "title": "Title_one", "order": 1 }, 
      { "title": "Title_two", "order": 2 }
    ]`,
    description: 'array columns',
  })
  @IsArray()
  columns: ColumnBoard[];
}
