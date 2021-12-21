import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const PORT = process.env.PORT || 4000,
  NODE_ENV = process.env.NODE_ENV,
  MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY,
  AUTH_MODE = process.env.AUTH_MODE === 'true';

export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE };
