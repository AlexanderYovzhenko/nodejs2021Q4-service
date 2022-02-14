import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import OrmColumn from './column.model';

@Entity()
class OrmBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('json', { nullable: true })
  columns!: [OrmColumn];
}

export default OrmBoard;
