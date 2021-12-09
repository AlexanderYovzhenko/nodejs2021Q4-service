const { FastifyRequest, FastifyReply } = require('fastify');
import { v4 as uuid } from 'uuid';
const taskService = require('../task.service');

const getTasksAll = async (
  _: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const tasks = await taskService.getTasksAllService();
  reply.code(200).send(tasks);
};

const getTaskId = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { taskId } = request.params;

  if (await taskService.getTaskIdService(taskId)) {
    const task = await taskService.getTaskIdService(taskId);
    reply.code(200).send(task);
  } else {
    reply.code(404).send('Not found');
  }
};

const addTask = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { boardId } = request.params;
  request.body.boardId = boardId;
  const task = {
    id: uuid(),
    ...request.body,
  };
  await taskService.addTaskService(task);
  reply.code(201).send(task);
};

const updateTask = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { taskId } = request.params;
  const updTask = {
    id: taskId,
    ...request.body,
  };
  await taskService.updateTaskService(taskId, updTask);
  reply.code(200).send(updTask);
};

const deleteTask = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { taskId } = request.params;

  if (taskService.getTaskIdService(taskId)) {
    await taskService.deleteTaskService(taskId);
    reply.code(204);
  } else {
    reply.code(404);
  }
};

module.exports = {
  getTasksAll,
  getTaskId,
  addTask,
  deleteTask,
  updateTask,
};
