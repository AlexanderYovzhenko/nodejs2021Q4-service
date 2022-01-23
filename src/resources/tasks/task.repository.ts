import { getRepository } from 'typeorm';
import OrmTask from './task.model';

/**
 * Return array tasks(dbTasks)
 * @returns dbTasks
 */
const getTasksAll = async (): Promise<OrmTask[]> => {
  const tasks = await getRepository(OrmTask).find();

  return tasks;
};

/**
 * Return object task with ID task equal taskID
 * @param taskID -first argument ID task
 * @returns object task with ID task or null
 */
const getTaskId = async (taskId: string): Promise<OrmTask | undefined> => {
  const idTask = await getRepository(OrmTask).findOne(taskId);

  return idTask;
};
// dbTasks.find((task) => task.id === taskId);

/**
 * Add object new task in array tasks(dbTasks)
 * @param task -first argument new task
 * @returns void
 */
const addTask = async (task: OrmTask): Promise<void> => {
  await getRepository(OrmTask).insert(task);
};

/**
 * Update object task with ID task equal taskID in array tasks(dbTasks)
 * @param taskID -first argument ID task
 * @param updTask -second argument object update task(updTask)
 * @returns void
 */
const updateTask = async (taskId: string, updTask: OrmTask): Promise<void> => {
  await getRepository(OrmTask).update(taskId, updTask);
};

/**
 * Delete object task with ID task equal taskID in array tasks(dbTasks)
 * @param taskID -first argument ID task
 * @returns void
 */
const deleteTask = async (taskId: string): Promise<void> => {
  await getRepository(OrmTask).delete(taskId);
};

/**
 * Delete objects task with ID board equal boardID in array tasks(dbTasks)
 * @param boardID -first argument ID board
 * @returns void
 */
const deleteTaskFromBoard = async (boardId: string): Promise<void> => {
  await getRepository(OrmTask).delete({ boardId: boardId });
};

// /**
//  * Update field userId in objects task with ID user equal userID on null in array tasks(dbTasks)
//  * @param userID -first argument ID user
//  * @returns void
//  */
// const updateUserId = async (userId: string | undefined): Promise<void> => {
//   await getRepository(OrmTask).update({ userId }, { userId: undefined });
// };

export default {
  getTasksAll,
  getTaskId,
  addTask,
  deleteTask,
  updateTask,
  deleteTaskFromBoard,
  // updateUserId,
};
