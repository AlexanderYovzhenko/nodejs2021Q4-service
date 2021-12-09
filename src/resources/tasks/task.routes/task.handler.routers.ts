const {
  FastifyRequest: FastifyRequestTask,
  FastifyReply: FastifyReplyTask,
} = require('fastify');
const taskService = require('../task.service');
const statusCodeTask = require('../../../common/status.code');
const Task = require('../task.model');

const getTasksAllRouter = async (
  _: typeof FastifyRequestTask,
  reply: typeof FastifyReplyTask
) => {
  const tasks = await taskService.getTasksAllService();
  reply.code(statusCodeTask.OK).send(tasks);
};

const getTaskIdRouter = async (
  request: typeof FastifyRequestTask,
  reply: typeof FastifyReplyTask
) => {
  const { taskId } = request.params;

  if (await taskService.getTaskIdService(taskId)) {
    const task = await taskService.getTaskIdService(taskId);
    reply.code(statusCodeTask.OK).send(task);
  } else {
    reply.code(statusCodeTask.NOT_FOUND).send('Not found');
  }
};

const addTaskRouter = async (
  request: typeof FastifyRequestTask,
  reply: typeof FastifyReplyTask
) => {
  const { boardId } = request.params;
  request.body.boardId = boardId;
  const task: object = new Task(request.body);
  await taskService.addTaskService(task);
  reply.code(statusCodeTask.CREATED).send(task);
};

const updateTaskRouter = async (
  request: typeof FastifyRequestTask,
  reply: typeof FastifyReplyTask
) => {
  const { taskId } = request.params;
  const updTask: object = new Task(request.body, taskId);
  await taskService.updateTaskService(taskId, updTask);
  reply.code(statusCodeTask.OK).send(updTask);
};

const deleteTaskRouter = async (
  request: typeof FastifyRequestTask,
  reply: typeof FastifyReplyTask
) => {
  const { taskId } = request.params;

  if (taskService.getTaskIdService(taskId)) {
    await taskService.deleteTaskService(taskId);
    reply.code(statusCodeTask.NO_CONTENT);
  } else {
    reply.code(statusCodeTask.NOT_FOUND);
  }
};

module.exports = {
  getTasksAllRouter,
  getTaskIdRouter,
  addTaskRouter,
  deleteTaskRouter,
  updateTaskRouter,
};
