import sequelize from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IColumn } from '../interfaces/column-interface';

@Table({ tableName: 'columns', updatedAt: false })
export class Columns extends Model<Columns, IColumn> {
  @Column({
    type: DataType.UUID,
    defaultValue: sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  columnId: string;

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({ type: DataType.NUMBER, allowNull: true })
  order: number;
}
