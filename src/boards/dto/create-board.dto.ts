import { IColumn } from '../interfaces/column-interface';

export class CreateBoardDto {
  title: string;
  columns: IColumn[];
}
