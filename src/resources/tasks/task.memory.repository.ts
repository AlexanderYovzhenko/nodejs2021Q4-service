interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

let dbTasks: ITask[] = [];

const getTasksAll = async () => dbTasks;

const getTaskId = async (taskId: string) =>
  dbTasks.find((task) => task.id === taskId) || null;

const addTask = async (task: ITask) => {
  dbTasks.push(task);
};

const updateTask = async (taskId: string, updTask: ITask) => {
  dbTasks = dbTasks.map((task) => (task.id === taskId ? updTask : task));
};

const deleteTask = async (taskId: string) => {
  dbTasks = dbTasks.filter((task) => task.id !== taskId);
};

const deleteTaskFromBoard = async (boardId: string) => {
  dbTasks = dbTasks.filter((task) => task.boardId !== boardId);
};

const updateUserId = async (userId: string) => {
  dbTasks.forEach((task) => {
    if (task.userId === userId) task.userId = null;
  });
};

module.exports = {
  getTasksAll,
  getTaskId,
  addTask,
  deleteTask,
  updateTask,
  deleteTaskFromBoard,
  updateUserId,
};
