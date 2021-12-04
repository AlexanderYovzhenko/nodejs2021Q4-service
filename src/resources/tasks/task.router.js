const { getTasksAll, getTaskId, addTask, deleteTask, updateTask } = require('./task.service');

const task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' }, 
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] }, 
    boardId: { type: ['string', 'null'] },
    columnId: { type: ['string', 'null'] }
  }
};

const getTasksOpts = { 
  schema: {
    response: {
      200: {
        type: 'array',
        items: task
      }
    }
  },
  handler: getTasksAll
};

const getTaskOpts = {
  schema: {
    response: {
      200: task 
    }
  },
  handler: getTaskId
};

const addTaskOpts = {
  schema: {
    response: {
      201: task 
    }
  },
  handler: addTask
};

const deleteTaskOpts = {
  schema: {
    response: {
      204: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteTask,
};

const updateTaskOpts = {
  schema: {
    response: {
      200: task,
    },
  },
  handler: updateTask,
};

const taskRoutes = (app, options, done) => {

  app.get('/boards/:boardId/tasks', getTasksOpts);

  app.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  app.post('/boards/:boardId/tasks', addTaskOpts);
  
  app.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);  

  app.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  done();
};

module.exports = taskRoutes;
