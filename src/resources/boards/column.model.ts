import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IColumn } from '../../common/type';
import OrmBoard from './board.model';

@Entity()
class OrmColumn implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  columnId!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => OrmBoard, (board: OrmBoard) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board!: OrmBoard;
}

export default OrmColumn;
