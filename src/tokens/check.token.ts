import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import statusCode from '../common/status.code';

const checkToken = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const path = request.routerPath;
  const autHeader = request.headers.authorization;

  if (path === '/login' || path.includes('/doc', 0) || path === '/')
    return done();

  if (autHeader === undefined) {
    reply.status(statusCode.UNAUTHORIZED).send('Authorization Error');
  } else {
    const [type, token] = autHeader.split(' ');

    if (type === 'Bearer' && token) {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (error) {
        reply.status(statusCode.UNAUTHORIZED).send('Authorization Error');
      }
    } else {
      reply.status(statusCode.UNAUTHORIZED).send('Authorization Error');
    }
  }

  done();
};

export { checkToken };
