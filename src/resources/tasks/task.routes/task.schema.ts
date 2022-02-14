import taskHandlerRouters from './task.controller';

const task = {
  type: 'object',
  required: ['title', 'order', 'description', 'userId', 'boardId'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: ['string', 'null'] },
    columnId: { type: ['string', 'null'] },
  },
};

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: task,
      },
    },
  },
  handler: taskHandlerRouters.getTasksAllRouter,
};

const getTaskOpts = {
  schema: {
    response: {
      200: task,
    },
  },
  handler: taskHandlerRouters.getTaskIdRouter,
};

const addTaskOpts = {
  schema: {
    body: task,
    response: {
      201: task,
    },
  },
  handler: taskHandlerRouters.addTaskRouter,
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
  handler: taskHandlerRouters.deleteTaskRouter,
};

const updateTaskOpts = {
  schema: {
    body: task,
    response: {
      200: task,
    },
  },
  handler: taskHandlerRouters.updateTaskRouter,
};

export default {
  getTasksOpts,
  getTaskOpts,
  addTaskOpts,
  deleteTaskOpts,
  updateTaskOpts,
};
