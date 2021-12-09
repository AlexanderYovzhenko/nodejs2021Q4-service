import { FastifyPluginAsync } from 'fastify';
const taskSchema = require('./task.schema');

const taskRoutes: FastifyPluginAsync = async (app) => {
  await app.get('/boards/:boardId/tasks', taskSchema.getTasksOpts);

  await app.get('/boards/:boardId/tasks/:taskId', taskSchema.getTaskOpts);

  await app.post('/boards/:boardId/tasks', taskSchema.addTaskOpts);

  await app.put('/boards/:boardId/tasks/:taskId', taskSchema.updateTaskOpts);

  await app.delete('/boards/:boardId/tasks/:taskId', taskSchema.deleteTaskOpts);
};

module.exports = taskRoutes;
