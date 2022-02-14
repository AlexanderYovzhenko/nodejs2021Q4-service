import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class OrmUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;
}

export default OrmUser;
