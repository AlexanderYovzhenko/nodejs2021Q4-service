import { FastifyPluginAsync } from 'fastify';

const boardSchema = require('./board.schema');

/**
 * Listens to boards routes
 * @param app -first argument app(fastify instance)
 * @returns void
 */
const boardRoutes: FastifyPluginAsync = async (app) => {
  await app.get('/boards', boardSchema.getBoardsOpts);

  await app.get('/boards/:boardId', boardSchema.getBoardOpts);

  await app.post('/boards', boardSchema.addBoardOpts);

  await app.put('/boards/:boardId', boardSchema.updateBoardOpts);

  await app.delete('/boards/:boardId', boardSchema.deleteBoardOpts);
};

module.exports = boardRoutes;
