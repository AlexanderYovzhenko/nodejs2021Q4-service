import sequelize from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IBoard } from '../interfaces/board-interface';
import { IColumn } from '../interfaces/column-interface';

@Table({ tableName: 'boards', updatedAt: false })
export class Board extends Model<Board, IBoard> {
  @Column({
    type: DataType.UUID,
    defaultValue: sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({ type: DataType.ARRAY(DataType.JSON) })
  columns: IColumn[];
}
