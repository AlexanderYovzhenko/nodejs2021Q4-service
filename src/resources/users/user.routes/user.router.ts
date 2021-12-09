import { FastifyPluginAsync } from 'fastify';
const { FastifyReply } = require('fastify');
const userSchema = require('./user.schema');

const userRoutes: FastifyPluginAsync = async (app): Promise<void> => {
  await app.get('/', async (reply: typeof FastifyReply) =>
    reply.send({ Message: 'Service: is running!' })
  );

  await app.get('/users', userSchema.getUsersOpts);

  await app.get('/users/:userId', userSchema.getUserOpts);

  await app.post('/users', userSchema.addUserOpts);

  await app.put('/users/:userId', userSchema.updateUserOpts);

  await app.delete('/users/:userId', userSchema.deleteUserOpts);
};

module.exports = userRoutes;
