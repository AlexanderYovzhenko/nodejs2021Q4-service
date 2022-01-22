import { app } from '../app';
import { logger } from '../logging/logger';

const errorsHandler = () => {
  app.setErrorHandler((err, _, reply) => {
    reply.send(err);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(err);
    setTimeout(() => {
      process.exit(1);
    }, 100);
  });

  process.on('uncaughtException', (err) => {
    logger.error(err);
    setTimeout(() => {
      process.exit(1);
    }, 100);
  });
};

export default errorsHandler;
