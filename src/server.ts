import { PORT } from './common/config';
import { app as server } from './app';
import { logger } from './common/logger';

/**
 * Run the server!
 * Listening on a port and displaying a message in the log.
 * If error then exit process and displaying a message about error in the log.
 * @returns void
 */
const startServer = async () => {
  try {
    await server.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  } catch (err: unknown) {
    server.log.error(err);
    logger.error(err);
    process.exit(1);
  }
};

startServer();
