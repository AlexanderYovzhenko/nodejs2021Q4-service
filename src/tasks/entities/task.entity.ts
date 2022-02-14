import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    default: 'title',
  })
  title: string;

  @Column({
    type: 'int',
    default: '0',
  })
  order: number;

  @Column({
    type: 'varchar',
    default: 'description',
  })
  description: string;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'boardId',
  })
  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  boardId: string | null;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'userId',
  })
  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  userId: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  columnId: string | null;
}
