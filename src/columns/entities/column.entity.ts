import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity('columns')
export class ColumnBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    default: 'title',
  })
  title!: string;

  @Column({
    type: 'int',
    default: '0',
  })
  order!: number;

  @ManyToOne(() => Board, (board: Board) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board!: Board;
}
