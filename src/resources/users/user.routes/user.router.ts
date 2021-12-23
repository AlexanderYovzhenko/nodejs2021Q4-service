import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import userSchema from './user.schema';
import { logger, logCollect } from '../../../common/logger';

/**
 * Listens to users routes
 * @param app -first argument app(fastify instance)
 * @returns void
 */
const userRoutes: FastifyPluginAsync = async (app): Promise<void> => {
  app.get('/', async (_: FastifyRequest, reply: FastifyReply) => {
    logger.info(logCollect(_, reply));
    reply.send({ Message: 'Service: is running!' });
  });

  app.get('/users', userSchema.getUsersOpts);

  app.get('/users/:userId', userSchema.getUserOpts);

  app.post('/users', userSchema.addUserOpts);

  app.put('/users/:userId', userSchema.updateUserOpts);

  app.delete('/users/:userId', userSchema.deleteUserOpts);
};

export default userRoutes;
