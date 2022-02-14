import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IBoard } from '../../common/type';
import OrmTask from '../tasks/task.model';
import OrmColumn from './column.model';

@Entity()
class OrmBoard implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('json', { nullable: true })
  columns!: [OrmColumn];

  @OneToMany(() => OrmTask, (task) => task.boardId)
  tasks!: OrmTask[];
}

export default OrmBoard;
