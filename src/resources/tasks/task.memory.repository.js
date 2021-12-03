let dbTasks = [];

const getTasksAll = async () =>  dbTasks;

const getTaskId = async (taskId) => dbTasks.find(task => task.id === taskId) || null;

const addTask = async (task) => {
  dbTasks.push(task);
};

const updateTask = async (taskId, updTask) => {
  dbTasks = dbTasks.map(task => task.id === taskId ? updTask : task);
};

const deleteTask = async (taskId) => {
  dbTasks = dbTasks.filter(task => task.id !== taskId);
};

const deleteTaskFromBoard = async (boardId) => {
  dbTasks = dbTasks.filter(task => task.boardId !== boardId)
};

const updateUserId = async (userId) => {
  dbTasks.forEach(task => { 
    if(task.userId === userId) task.userId = null;
  });
};  

module.exports = { getTasksAll, getTaskId, addTask, deleteTask, updateTask, deleteTaskFromBoard, updateUserId };
