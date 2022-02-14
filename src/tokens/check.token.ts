import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { AuthorizationError } from '../errors/custom.errors';

/**
 * Intermediate function
 * Checks for a valid token
 * @param request -first argument request
 * @param _ -second argument response
 * @returns void
 */
const checkToken = (
  request: FastifyRequest,
  _: FastifyReply,
  done: (err?: FastifyError) => void
) => {
  const path = request.routerPath;
  const autHeader = request.headers.authorization;

  if (path === '/login' || path.includes('/doc', 0) || path === '/')
    return done();

  if (autHeader === undefined) {
    throw new AuthorizationError('Authorization Error!');
  } else {
    const [type, token] = autHeader.split(' ');

    if (type === 'Bearer' && token) {
      try {
        jwt.verify(token, JWT_SECRET_KEY!);
      } catch (error) {
        throw new AuthorizationError('Authorization Error!');
      }
    } else {
      throw new AuthorizationError('Authorization Error!');
    }
  }

  done();
};

export { checkToken };
