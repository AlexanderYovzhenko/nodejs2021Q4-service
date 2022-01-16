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
  host: DB_HOST,
  port: PORT_DB ? +PORT_DB : 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: POSTGRES_DB || 'postgres',
  dropSchema: true,
  logging: false,
  synchronize: true,
  entities: [path.join(__dirname, '/**/*.model.ts')],
  migrationsRun: true,
  migrations: [path.join(__dirname, '/migrations/**/*.ts')],
  cli: {
    migrationsDir: 'db/migrations',
  },
};

export default config;
