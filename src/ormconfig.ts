import { ConnectionOptions } from 'typeorm';
import { POSTGRES_DB, POSTGRES_PASSWORD } from './common/config';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dropSchema: true,
  logging: true,
  synchronize: false,
  migrationsRun: true,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
