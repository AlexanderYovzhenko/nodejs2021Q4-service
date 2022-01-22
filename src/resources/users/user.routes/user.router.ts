import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import userSchema from './user.schema';
import statusCode from '../../../common/status.code';

/**
 * Listens to users routes
 * @param app -first argument app(fastify instance)
 * @returns void
 */
const userRoutes: FastifyPluginAsync = async (app): Promise<void> => {
  app.get('/*', (_: FastifyRequest, reply: FastifyReply) => {
    reply.status(statusCode.NOT_FOUND).send('Not Found URL');
  });

  app.get('/', async (_: FastifyRequest, reply: FastifyReply) => {
    reply.send({ Message: 'Service: is running!' });
  });

  app.get('/users', userSchema.getUsersOpts);

  app.get('/users/:userId', userSchema.getUserOpts);

  app.post('/users', userSchema.addUserOpts);

  app.put('/users/:userId', userSchema.updateUserOpts);

  app.delete('/users/:userId', userSchema.deleteUserOpts);
};

export default userRoutes;
