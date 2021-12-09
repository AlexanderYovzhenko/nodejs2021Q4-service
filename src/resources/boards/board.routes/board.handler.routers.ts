const {
  FastifyRequest: FastifyRequestBoard,
  FastifyReply: FastifyReplyBoard,
} = require('fastify');
import { v4 as uuid } from 'uuid';
const boardService = require('../board.service');
const statusCodeBoard = require('../../../common/status.code');
const Board = require('../board.model');

const getBoardsAllRouter = async (
  _: typeof FastifyRequestBoard,
  reply: typeof FastifyReplyBoard
) => {
  const board = await boardService.getBoardsAllService();
  reply.code(statusCodeBoard.OK).send(board);
};

const getBoardIdRouter = async (
  request: typeof FastifyRequestBoard,
  reply: typeof FastifyReplyBoard
) => {
  const { boardId } = request.params;

  if (await boardService.getBoardIdService(boardId)) {
    const board = await boardService.getBoardIdService(boardId);
    reply.code(statusCodeBoard.OK).send(board);
  } else {
    reply.code(statusCodeBoard.NOT_FOUND).send('Not found');
  }
};

const addBoardRouter = async (
  request: typeof FastifyRequestBoard,
  reply: typeof FastifyReplyBoard
) => {
  request.body.columns.forEach((column: { columnId: string }) => {
    column.columnId = uuid();
  });
  const board: object = new Board(request.body);
  await boardService.addBoardService(board);
  reply.code(statusCodeBoard.CREATED).send(board);
};

const updateBoardRouter = async (
  request: typeof FastifyRequestBoard,
  reply: typeof FastifyReplyBoard
) => {
  const { boardId } = request.params;
  const updBoard = new Board(request.body, boardId);
  await boardService.updateBoardService(boardId, updBoard);
  reply.code(statusCodeBoard.OK).send(updBoard);
};

const deleteBoardRouter = async (
  request: typeof FastifyRequestBoard,
  reply: typeof FastifyReplyBoard
) => {
  const { boardId } = request.params;

  if (await boardService.getBoardIdService(boardId)) {
    await boardService.deleteBoardService(boardId);
    reply.code(statusCodeBoard.NO_CONTENT).send();
  } else {
    reply.code(statusCodeBoard.NOT_FOUND).send('Not found');
  }
};

module.exports = {
  getBoardsAllRouter,
  getBoardIdRouter,
  addBoardRouter,
  deleteBoardRouter,
  updateBoardRouter,
};
