import { ITask } from '../../common/type';

let dbTasks: ITask[] = [];

/**
 * Return array tasks(dbTasks)
 * @returns dbTasks
 */
const getTasksAll = async (): Promise<ITask[]> => dbTasks;

/**
 * Return object task with ID task equal taskID
 * @param taskID -first argument ID task
 * @returns object task with ID task or null
 */
const getTaskId = async (taskId: string): Promise<ITask | undefined> =>
  dbTasks.find((task) => task.id === taskId);

/**
 * Add object new task in array tasks(dbTasks)
 * @param task -first argument new task
 * @returns void
 */
const addTask = async (task: ITask): Promise<void> => {
  dbTasks.push(task);
};

/**
 * Update object task with ID task equal taskID in array tasks(dbTasks)
 * @param taskID -first argument ID task
 * @param updTask -second argument object update task(updTask)
 * @returns void
 */
const updateTask = async (taskId: string, updTask: ITask): Promise<void> => {
  dbTasks = dbTasks.map((task) => (task.id === taskId ? updTask : task));
};

/**
 * Delete object task with ID task equal taskID in array tasks(dbTasks)
 * @param taskID -first argument ID task
 * @returns void
 */
const deleteTask = async (taskId: string): Promise<void> => {
  dbTasks = dbTasks.filter((task) => task.id !== taskId);
};

/**
 * Delete objects task with ID board equal boardID in array tasks(dbTasks)
 * @param boardID -first argument ID board
 * @returns void
 */
const deleteTaskFromBoard = async (boardId: string): Promise<void> => {
  dbTasks = dbTasks.filter((task) => task.boardId !== boardId);
};

/**
 * Update field userId in objects task with ID user equal userID on null in array tasks(dbTasks)
 * @param userID -first argument ID user
 * @returns void
 */
const updateUserId = async (userId: string): Promise<void> => {
  dbTasks.forEach((task) => {
    if (task.userId === userId) task.userId = null;
  });
};

export default {
  getTasksAll,
  getTaskId,
  addTask,
  deleteTask,
  updateTask,
  deleteTaskFromBoard,
  updateUserId,
};
