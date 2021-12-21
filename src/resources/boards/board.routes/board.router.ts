import { FastifyPluginAsync } from 'fastify';
import boardSchema from './board.schema';

/**
 * Listens to boards routes
 * @param app -first argument app(fastify instance)
 * @returns void
 */
const boardRoutes: FastifyPluginAsync = async (app) => {
  app.get('/boards', boardSchema.getBoardsOpts);

  app.get('/boards/:boardId', boardSchema.getBoardOpts);

  app.post('/boards', boardSchema.addBoardOpts);

  app.put('/boards/:boardId', boardSchema.updateBoardOpts);

  app.delete('/boards/:boardId', boardSchema.deleteBoardOpts);
};

export default boardRoutes;
