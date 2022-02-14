const { getBoardsAll, getBoardId, addBoard, deleteBoard, updateBoard } = require('./board.service');

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
          order: { type: 'number' }
        }
      }
    }
  }
};

const getBoardsOpts = { 
  schema: {
    response: {
      200: {
        type: 'array',
        items: board
      }
    }
  },
  handler: getBoardsAll
};

const getBoardOpts = {
  schema: {
    response: {
      200: board 
    }
  },
  handler: getBoardId
};

const addBoardOpts = {
  schema: {
    body: board,
    response: {
      201: board 
    }
  },
  handler: addBoard
};

const deleteBoardOpts = {
  schema: {
    response: {
      204: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        }
      }
    }
  },
  handler: deleteBoard,
};

const updateBoardOpts = {
  schema: {
    body: board,
    response: {
      200: board,
    },
  },
  handler: updateBoard,
}


const boardRoutes = (app, options, done) => {

  app.get('/boards', getBoardsOpts);

  app.get('/boards/:boardId', getBoardOpts);

  app.post('/boards', addBoardOpts);
  
  app.put('/boards/:boardId', updateBoardOpts);  

  app.delete('/boards/:boardId', deleteBoardOpts);

  done();
};

module.exports = boardRoutes;
