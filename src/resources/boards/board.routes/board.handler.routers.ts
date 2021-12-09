const { FastifyRequest, FastifyReply } = require('fastify');
import { v4 as uuid } from 'uuid';
const boardService = require('../board.service');

const getBoardsAll = async (
  _: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const board = await boardService.getBoardsAllService();
  reply.code(200).send(board);
};

const getBoardId = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { boardId } = request.params;

  if (await boardService.getBoardIdService(boardId)) {
    const board = await boardService.getBoardIdService(boardId);
    reply.code(200).send(board);
  } else {
    reply.code(404).send('Not found');
  }
};

const addBoard = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  request.body.columns.forEach((column: { columnId: string }) => {
    column.columnId = uuid();
  });
  const board = {
    id: uuid(),
    ...request.body,
  };
  await boardService.addBoardService(board);
  reply.code(201).send(board);
};

const updateBoard = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { boardId } = request.params;
  const updBoard = {
    id: boardId,
    ...request.body,
  };
  await boardService.updateBoardService(boardId, updBoard);
  reply.code(200).send(updBoard);
};

const deleteBoard = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { boardId } = request.params;

  if (await boardService.getBoardIdService(boardId)) {
    await boardService.deleteBoardService(boardId);
    reply.code(204).send();
  } else {
    reply.code(404).send('Not found');
  }
};

module.exports = {
  getBoardsAll,
  getBoardId,
  addBoard,
  deleteBoard,
  updateBoard,
};
