import { FastifyPluginAsync } from 'fastify';
import taskSchema from './task.schema';

/**
 * Listens to tasks routes
 * @param app -first argument app(fastify instance)
 * @returns void
 */
const taskRoutes: FastifyPluginAsync = async (app) => {
  app.get('/boards/:boardId/tasks', taskSchema.getTasksOpts);

  app.get('/boards/:boardId/tasks/:taskId', taskSchema.getTaskOpts);

  app.post('/boards/:boardId/tasks', taskSchema.addTaskOpts);

  app.put('/boards/:boardId/tasks/:taskId', taskSchema.updateTaskOpts);

  app.delete('/boards/:boardId/tasks/:taskId', taskSchema.deleteTaskOpts);
};

export default taskRoutes;
