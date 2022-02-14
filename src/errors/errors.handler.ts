import { app } from '../app';
import { logger, logCollect } from '../common/logger';

const processExit = () => {
  process.exit(1);
};

const errorsHandler = () => {
  app.setErrorHandler((error, request, reply) => {
    reply.send(error);
    logger.error(logCollect(request, reply, error));
  });

  process.on('unhandledRejection', (err, origin) => {
    logger.error(err);
    logger.warn(origin);
    setTimeout(() => {
      processExit();
    }, 100);
  });

  process.on('uncaughtException', (err, origin) => {
    logger.error(err);
    logger.warn(origin);
    setTimeout(() => {
      processExit();
    }, 100);
  });
};

export default errorsHandler;
