import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import OrmBoard from './board.model';

@Entity()
class OrmColumn {
  @PrimaryGeneratedColumn('uuid')
  columnId!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => OrmBoard, (board: OrmBoard) => board.columns, {
    cascade: ['remove', 'update'],
  })
  board!: OrmBoard;
}

export default OrmColumn;
