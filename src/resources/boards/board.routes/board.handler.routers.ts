import { v4 as uuid } from 'uuid';

const {
  FastifyRequest: FastifyRequestBoard,
  FastifyReply: FastifyReplyBoard,
} = require('fastify');
const boardService = require('../board.service');
const statusCodeBoard = require('../../../common/status.code');
const Board = require('../board.model');

/**
 * Get array boards from function getBoardsAllService.
 * Install in reply status code (ok) and send in reply array boards
 * @param _ -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const getBoardsAllRouter = async (
  _: typeof FastifyRequestBoard,
  reply: typeof FastifyReplyBoard
) => {
  const board = await boardService.getBoardsAllService();
  reply.code(statusCodeBoard.OK).send(board);
};

/**
 * Get boardId from request.params.
 * If object board found then:
 * Get object board from function getBoardIdService(boardId).
 * Install in reply status code (ok) and send in reply object board.
 * If object board not found then:
 * Install in reply status code (not_found) and send in reply message'Not found'.
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
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

/**
 * Add in objects column new field columnId equal uuid.
 * Get (object board) instance class Board(request.body)(add field boardID equal uuid).
 * Called function addBoardService(add new board).
 * Install in reply status code (created) and send in reply object new board
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
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

/**
 * Get boardId from request.params.
 * Get (object update board) instance class board(request.body, boardID).
 * Called function updateBoardService(update object board).
 * Install in reply status code (ok) and send in reply object update board
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const updateBoardRouter = async (
  request: typeof FastifyRequestBoard,
  reply: typeof FastifyReplyBoard
) => {
  const { boardId } = request.params;
  const updBoard = new Board(request.body, boardId);
  await boardService.updateBoardService(boardId, updBoard);
  reply.code(statusCodeBoard.OK).send(updBoard);
};

/**
 * Get boardId from request.params.
 * If object board found then:
 * Called function deleteBoardService(delete object board).
 * Install in reply status code (no_content).
 * If object board not found then:
 * Install in reply status code (not_found) and send in reply message 'Not found'
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
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
