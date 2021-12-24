import { app } from '../app';
import { logger } from '../common/logger';

const errorHandler = () => {
  app.setErrorHandler((error, request, reply) => {
    logger.error(error);
    reply.status(500).send(error);
  });
};

export default errorHandler;
