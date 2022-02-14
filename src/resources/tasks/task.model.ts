import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import OrmUser from '../users/user.model';

@Entity()
class OrmTask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ type: 'uuid', nullable: true, name: 'columnId' })
  columnId!: string;

  @Column({ type: 'uuid', nullable: true, name: 'boardId' })
  boardId!: string;

  @ManyToOne(() => OrmUser, (user) => user.id, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  userId!: string;
}

export default OrmTask;
