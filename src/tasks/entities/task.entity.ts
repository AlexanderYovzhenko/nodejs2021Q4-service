import sequelize from 'sequelize';
import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
// import { User } from 'src/users/entities/user.entity';
import { ITask } from '../interfaces/task-interface';

@Table({ tableName: 'tasks', updatedAt: false })
export class Task extends Model<Task, ITask> {
  @Column({
    type: DataType.UUID,
    defaultValue: sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.INTEGER })
  order: number;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  // @HasMany(() => User, {
  //     foreignKey: {
  //       name: 'userId'
  //     }
  // })
  userId: string;

  @Column({ type: DataType.STRING, allowNull: true })
  boardId: string;

  @Column({ type: DataType.STRING, allowNull: true })
  columnId: string;
}
