const tasksRepo = require('./task.memory.repository');

const getTasksAllService = async (): Promise<object> =>
  await tasksRepo.getTasksAll();

const getTaskIdService = async (taskId: string): Promise<object> =>
  await tasksRepo.getTaskId(taskId);

const addTaskService = async (task: object) => {
  await tasksRepo.addTask(task);
};

const updateTaskService = async (taskId: string, updTask: object) => {
  await tasksRepo.updateTask(taskId, updTask);
};

const deleteTaskService = async (taskId: string) => {
  await tasksRepo.deleteTask(taskId);
};

const deleteTaskFromBoardService = async (boardId: string) => {
  await tasksRepo.deleteTaskFromBoard(boardId);
};

const updateUserIdService = async (userId: string) => {
  await tasksRepo.updateUserId(userId);
};

module.exports = {
  getTasksAllService,
  getTaskIdService,
  addTaskService,
  deleteTaskService,
  updateTaskService,
  deleteTaskFromBoardService,
  updateUserIdService,
};
