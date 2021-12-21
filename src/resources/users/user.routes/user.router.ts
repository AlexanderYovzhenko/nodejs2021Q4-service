import { FastifyPluginAsync } from 'fastify';
// import { FastifyReply } from 'fastify';
import userSchema from './user.schema';

/**
 * Listens to users routes
 * @param app -first argument app(fastify instance)
 * @returns void
 */
const userRoutes: FastifyPluginAsync = async (app): Promise<void> => {
  // app.get('/', async (reply: FastifyReply) =>
  //   reply.send({ Message: 'Service: is running!' })
  // );

  app.get('/users', userSchema.getUsersOpts);

  app.get('/users/:userId', userSchema.getUserOpts);

  app.post('/users', userSchema.addUserOpts);

  app.put('/users/:userId', userSchema.updateUserOpts);

  app.delete('/users/:userId', userSchema.deleteUserOpts);
};

export default userRoutes;
