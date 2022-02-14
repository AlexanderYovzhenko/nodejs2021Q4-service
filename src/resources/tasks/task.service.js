const { v4: uuid } = require('uuid')
const tasksRepo = require('./task.memory.repository');

const getTasksAll = async (request, reply) => {
  const tasks = await tasksRepo.getTasksAll();
  reply.code(200).send(tasks);
};

const getTaskId = async (request, reply) => {
  const { taskId } = request.params;
  if(await tasksRepo.getTaskId(taskId)) {
    const task = await tasksRepo.getTaskId(taskId);
    reply.code(200).send(task);
  } else {
    reply.code(404).send('Not found');
  }
  
};

const addTask = async (request, reply) => {
  const { boardId } = request.params;
  request.body.boardId = boardId;
  const task = {
    id: uuid(),
    ...request.body
  };
  await tasksRepo.addTask(task);
  reply.code(201).send(task);
};

const updateTask = async (request, reply) => {
  const { taskId } = request.params;
  const updTask = {
    id: taskId,
    ...request.body
  };
  await tasksRepo.updateTask(taskId, updTask);
  reply.code(200).send(updTask);
};

const deleteTask = async (request, reply) => {
  const { taskId } = request.params;
  if(tasksRepo.getTaskId(taskId)) {
    await tasksRepo.deleteTask(taskId);
    reply.code(204);
  } else {
    reply.code(404);
  }
};

const deleteTaskFromBoard = async (boardId) => {
  await tasksRepo.deleteTaskFromBoard(boardId);
};

const updateUserId = async (userId) => {
  await tasksRepo.updateUserId(userId);
};

module.exports = { getTasksAll, getTaskId, addTask, deleteTask, updateTask, deleteTaskFromBoard, updateUserId };
