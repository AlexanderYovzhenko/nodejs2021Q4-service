import { v4 as uuid } from 'uuid';
import { FastifyRequest, FastifyReply } from 'fastify';
import boardService from '../board.service';
import statusCode from '../../../common/status.code';
import Board from '../board.model';
import { IBoard } from '../../../common/type';
import { logger, logCollect } from '../../../common/logger';

type FastifyRequestBoard = FastifyRequest<{
  Body: IBoard;
  Params: {
    boardId: string;
  };
}>;

/**
 * Get array boards from function getBoardsAllService.
 * Install in reply status code (ok) and send in reply array boards
 * @param _ -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const getBoardsAllRouter = async (_: FastifyRequest, reply: FastifyReply) => {
  const board = await boardService.getBoardsAllService();
  reply.code(statusCode.OK).send(board);
  logger.info(logCollect(_, reply));
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
  request: FastifyRequestBoard,
  reply: FastifyReply
) => {
  const { boardId } = request.params;

  if (await boardService.getBoardIdService(boardId)) {
    const board = await boardService.getBoardIdService(boardId);
    reply.code(statusCode.OK).send(board);
    logger.info(logCollect(request, reply));
  } else {
    reply.code(statusCode.NOT_FOUND).send('Not found');
    logger.error(logCollect(request, reply));
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
  request: FastifyRequestBoard,
  reply: FastifyReply
) => {
  const columnsArray = request.body.columns;
  columnsArray.forEach((column: { columnId: string }) => {
    column.columnId = uuid();
  });
  const board: IBoard = new Board(request.body);
  await boardService.addBoardService(board);
  reply.code(statusCode.CREATED).send(board);
  logger.info(logCollect(request, reply));
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
  request: FastifyRequestBoard,
  reply: FastifyReply
) => {
  const { boardId } = request.params;
  const updBoard: IBoard = new Board(request.body, boardId);
  await boardService.updateBoardService(boardId, updBoard);
  reply.code(statusCode.OK).send(updBoard);
  logger.info(logCollect(request, reply));
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
  request: FastifyRequestBoard,
  reply: FastifyReply
) => {
  const { boardId } = request.params;

  if (await boardService.getBoardIdService(boardId)) {
    await boardService.deleteBoardService(boardId);
    reply.code(statusCode.NO_CONTENT).send();
    logger.info(logCollect(request, reply));
  } else {
    reply.code(statusCode.NOT_FOUND).send('Not found');
    logger.error(logCollect(request, reply));
  }
};

export default {
  getBoardsAllRouter,
  getBoardIdRouter,
  addBoardRouter,
  deleteBoardRouter,
  updateBoardRouter,
};
