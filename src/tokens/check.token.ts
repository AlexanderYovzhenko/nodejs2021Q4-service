import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import statusCode from '../common/status.code';
import { logger, getLogObject } from '../logging/logger';

const checkToken = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const path = request.routerPath;

  if (path === '/login' || path.includes('/doc', 0) || path === '/')
    return done();

  const autHeader = request.headers.authorization;

  if (autHeader === undefined) {
    reply.status(statusCode.UNAUTHORIZED).send('Authorization Error');
    logger.error(getLogObject(request, reply));
  } else {
    const [type, token] = autHeader.split(' ');

    if (type !== 'Bearer') {
      reply.status(statusCode.UNAUTHORIZED).send('Bearer Error');
      logger.error(getLogObject(request, reply));
    } else {
      if (!token) {
        reply.status(statusCode.UNAUTHORIZED).send('No token');
        logger.error(getLogObject(request, reply));
      } else {
        try {
          jwt.verify(token, JWT_SECRET_KEY);
        } catch (error) {
          reply.status(statusCode.UNAUTHORIZED).send('token');
          logger.error(getLogObject(request, reply));
        }
      }
    }
  }
  done();
};

export { checkToken };
