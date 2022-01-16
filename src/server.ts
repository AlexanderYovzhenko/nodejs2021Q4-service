import { PORT } from './common/config';
import { app as server } from './app';
import { logger } from './logging/logger';
import { createConnection } from 'typeorm';
import config from './ormconfig';
// import 'reflect-metadata';

createConnection(config);

/**
 * Run the server!
 * Listening on a port and displaying a message in the log.
 * If error then exit process and displaying a message about error in the log.
 * @returns void
 */
const startServer = () => {
  try {
    server.listen(PORT, '0.0.0.0', () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    logger.error(err);
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
