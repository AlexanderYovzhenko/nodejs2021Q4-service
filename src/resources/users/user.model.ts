import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../common/type';
import OrmTask from '../tasks/task.model';

@Entity()
class OrmUser implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => OrmTask, (task) => task.userId)
  tasks!: OrmTask[];
}

export default OrmUser;
