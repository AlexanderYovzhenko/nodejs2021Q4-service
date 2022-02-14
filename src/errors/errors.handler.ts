import { app } from '../app';
import { logger, getLogObject } from '../logging/logger';

const errorsHandler = () => {
  app.setErrorHandler((error, request, reply) => {
    reply.send(error);
    logger.error(getLogObject(request, reply, error));
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
