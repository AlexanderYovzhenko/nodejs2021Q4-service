import { FastifyPluginAsync } from 'fastify';
import { addLoginRouter } from './login.controller';

/**
 * Listens to login routes
 * @param app -first argument app(fastify instance)
 * @returns void
 */
const loginRoutes: FastifyPluginAsync = async (app): Promise<void> => {
  app.post('/login', addLoginRouter);
};

export default loginRoutes;
