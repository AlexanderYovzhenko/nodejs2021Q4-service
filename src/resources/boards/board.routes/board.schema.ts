import boardHandlerRouters from './board.controller';

const board = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'order'],
        properties: {
          columnId: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'number' },
        },
      },
    },
  },
};

const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: board,
      },
    },
  },
  handler: boardHandlerRouters.getBoardsAllRouter,
};

const getBoardOpts = {
  schema: {
    response: {
      200: board,
    },
  },
  handler: boardHandlerRouters.getBoardIdRouter,
};

const addBoardOpts = {
  schema: {
    body: board,
    response: {
      201: board,
    },
  },
  handler: boardHandlerRouters.addBoardRouter,
};

const deleteBoardOpts = {
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
  handler: boardHandlerRouters.deleteBoardRouter,
};

const updateBoardOpts = {
  schema: {
    body: board,
    response: {
      200: board,
    },
  },
  handler: boardHandlerRouters.updateBoardRouter,
};

export default {
  getBoardsOpts,
  getBoardOpts,
  addBoardOpts,
  deleteBoardOpts,
  updateBoardOpts,
};
