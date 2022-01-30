import sequelize from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { IColumn } from '../interfaces/column-interface';
// import { Board } from './board.entity';

@Table({ tableName: 'columns', updatedAt: false })
export class Columns extends Model<Columns, IColumn> {
  @Column({
    type: DataType.UUID,
    defaultValue: sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  columnId: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.NUMBER })
  order: number;

  // @BelongsTo(() => Board)
  // boardId: Board;
}
