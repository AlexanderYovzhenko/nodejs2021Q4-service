const { v4: uuid } = require('uuid')
const boardsRepo = require('./board.memory.repository');
const { deleteTaskFromBoard } = require('../tasks/task.memory.repository');

const getBoardsAll = async (request, reply) => {
  const board = await boardsRepo.getBoardsAll();
  reply.code(200).send(board);
};

const getBoardId = async (request, reply) => {
  const { boardId } = request.params;
  if(await boardsRepo.getBoardId(boardId)) {
    const board = await boardsRepo.getBoardId(boardId);
    reply.code(200).send(board);
  } else {
    reply.code(404).send('Not found');
  }; 
};

const addBoard = async (request, reply) => {
  request.body.columns.forEach(column => {
    column.columnId = uuid();
  });
  const board = {
    id: uuid(),
    ...request.body
  };
  boardsRepo.addBoard(board);
  reply.code(201).send(board);
};

const updateBoard = async (request, reply) => {
  const { boardId } = request.params;
  const updBoard = {
    id: boardId,
    ...request.body
  };
  boardsRepo.updateBoard(boardId, updBoard);
  reply.code(200).send(updBoard);
};

const deleteBoard = async (request, reply) => {
  const { boardId } = request.params;
  if(await boardsRepo.getBoardId(boardId)) {
    await boardsRepo.deleteBoard(boardId);  
    await deleteTaskFromBoard(boardId); 
    reply.code(204).send();
  } else {
    reply.code(404).send('Not found');
  };
};

module.exports = { getBoardsAll, getBoardId, addBoard, deleteBoard, updateBoard };
