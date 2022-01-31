import sequelize from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
// import { Task } from 'src/tasks/entities/task.entity';
// import { Task } from 'src/tasks/entities/task.entity';
import { IUser } from '../interface/user-interface';

@Table({ tableName: 'users', updatedAt: false })
export class User extends Model<User, IUser> {
  // @ApiProperty({
  //   example: '887c6afa-c641-4226-b137-c0eea5125903',
  //   description: 'uuid',
  // })
  @Column({
    type: DataType.UUID,
    defaultValue: sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  login: string;

  @Column({ type: DataType.STRING })
  password: string;

  // @HasMany(() => Task)
  // task: Task[];

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
