import { FastifyRequest, FastifyReply } from 'fastify';
import taskService from '../task.service';
import statusCode from '../../../common/status.code';
import Task from '../task.model';
import { ITask } from '../../../common/type';
import { logger, getLogObject } from '../../../logging/logger';
import { NotFoundError } from '../../../errors/custom.errors';

type FastifyRequestTask = FastifyRequest<{
  Body: ITask;
  Params: {
    taskId: string;
    boardId: string;
  };
}>;

/**
 * Get array tasks from function getTasksAllService.
 * Install in reply status code (ok) and send in reply array tasks
 * @param _ -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const getTasksAllRouter = async (_: FastifyRequest, reply: FastifyReply) => {
  const tasks = await taskService.getTasksAllService();
  reply.code(statusCode.OK).send(tasks);
  logger.info(getLogObject(_, reply));
};

/**
 * Get taskId from request.params.
 * If object task found then:
 * Get object task from function getTaskIdService(taskId).
 * Install in reply status code (ok) and send in reply object task.
 * If object task not found then:
 * Install in reply status code (not_found) and send in reply message'Not found'.
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const getTaskIdRouter = async (
  request: FastifyRequestTask,
  reply: FastifyReply
) => {
  const { taskId } = request.params;

  if (await taskService.getTaskIdService(taskId)) {
    const task = await taskService.getTaskIdService(taskId);
    reply.code(statusCode.OK).send(task);
    logger.info(getLogObject(request, reply));
  } else {
    throw new NotFoundError('Not found task');
  }
};

/**
 * Get taskId from request.params.
 * Install request.body.boardID equal boardID.
 * Get (object task) instance class Task(request.body)(add field taskID equal uuid).
 * Called function addTaskService(add new task).
 * Install in reply status code (created) and send in reply object new task
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const addTaskRouter = async (
  request: FastifyRequestTask,
  reply: FastifyReply
) => {
  const { boardId } = request.params;
  request.body.boardId = boardId;
  const task: ITask = new Task(request.body);
  await taskService.addTaskService(task);
  reply.code(statusCode.CREATED).send(task);
  logger.info(getLogObject(request, reply));
};

/**
 * Get taskId from request.params.
 * Get (object update task) instance class task(request.body, taskID).
 * Called function updateTaskService(update object task).
 * Install in reply status code (ok) and send in reply object update task
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const updateTaskRouter = async (
  request: FastifyRequestTask,
  reply: FastifyReply
) => {
  const { taskId } = request.params;

  if (await taskService.getTaskIdService(taskId)) {
    const updTask: ITask = new Task(request.body, taskId);
    await taskService.updateTaskService(taskId, updTask);
    reply.code(statusCode.OK).send(updTask);
    logger.info(getLogObject(request, reply));
  } else {
    throw new NotFoundError('Not found task');
  }
};

/**
 * Get taskId from request.params.
 * If object task found then:
 * Called function deleteTaskService(delete object task).
 * Install in reply status code (no_content).
 * If object task not found then:
 * Install in reply status code (not_found) and send in reply message 'Not found'
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const deleteTaskRouter = async (
  request: FastifyRequestTask,
  reply: FastifyReply
) => {
  const { taskId } = request.params;

  if (await taskService.getTaskIdService(taskId)) {
    await taskService.deleteTaskService(taskId);
    reply.code(statusCode.NO_CONTENT);
    logger.info(getLogObject(request, reply));
  } else {
    throw new NotFoundError('Not found task');
  }
};

export default {
  getTasksAllRouter,
  getTaskIdRouter,
  addTaskRouter,
  deleteTaskRouter,
  updateTaskRouter,
};
