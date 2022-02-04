import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: '887c6afa-c641-4226-b137-c0eea5125903',
    description: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: 'name' })
  name: string;

  @Column({ type: 'varchar', default: 'login' })
  login: string;

  @Column({ type: 'varchar', default: 'password' })
  password: string;
}
