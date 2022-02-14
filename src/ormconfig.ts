import path from 'path';
import { ConnectionOptions } from 'typeorm';
import {
  PORT_DB,
  POSTGRES_DB,
  DB_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} from './common/config';

const config: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST || 'postgres',
  port: PORT_DB ? +PORT_DB : 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: POSTGRES_DB || 'postgres',
  dropSchema: false,
  logging: true,
  synchronize: false,
  entities: [path.join(__dirname, 'resources/**/*.model.ts')],
  migrationsRun: true,
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
