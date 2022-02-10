import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, `.${process.env.NODE_ENV}.env`),
});

export const PORT = process.env.PORT || 4000,
  POSTGRES_PORT = process.env.PORT_DB,
  POSTGRES_HOST = process.env.DB_HOST,
  POSTGRES_DB = process.env.POSTGRES_DB,
  POSTGRES_USER = process.env.POSTGRES_USER,
  POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD,
  POSTGRES_VERSION = process.env.POSTGRES_VERSION,
  NODE_VERSION = process.env.NODE_VERSION,
  LEVEL_LOG = process.env.LEVEL_LOG || '4',
  SALT_ROUNDS = process.env.SALT_ROUNDS || '10',
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY,
  NODE_ENV = process.env.NODE_ENV,
  AUTH_MODE = process.env.AUTH_MODE,
  TEST_MODE = process.env.TEST_MODE,
  USE_FASTIFY = process.env.USE_FASTIFY;
