import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const PORT = process.env.PORT || 4000,
  NODE_ENV = process.env.NODE_ENV,
  MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret-key',
  AUTH_MODE = process.env.AUTH_MODE === 'true',
  LEVEL_LOG = process.env.LEVEL_LOG || '4',
  PORT_DB = process.env.PORT_DB,
  POSTGRES_DB = process.env.POSTGRES_DB,
  DB_HOST = process.env.DB_HOST,
  POSTGRES_USER = process.env.POSTGRES_USER,
  POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD,
  SALT_HASH_PASSWORD = process.env.SALT_HASH_PASSWORD;

export {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  LEVEL_LOG,
  PORT_DB,
  POSTGRES_DB,
  DB_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  SALT_HASH_PASSWORD,
};
