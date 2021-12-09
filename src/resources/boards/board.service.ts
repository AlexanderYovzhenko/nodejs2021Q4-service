const boardsRepo = require('./board.memory.repository');
const taskServiceBoard = require('../tasks/task.service');

const getBoardsAllService = async (): Promise<object> =>
  await boardsRepo.getBoardsAll();

const getBoardIdService = async (boardId: string): Promise<object> =>
  await boardsRepo.getBoardId(boardId);

const addBoardService = async (board: object) => {
  await boardsRepo.addBoard(board);
};

const updateBoardService = async (boardId: string, updBoard: object) => {
  await boardsRepo.updateBoard(boardId, updBoard);
};

const deleteBoardService = async (boardId: string) => {
  await boardsRepo.deleteBoard(boardId);
  await taskServiceBoard.deleteTaskFromBoardService(boardId);
};

module.exports = {
  getBoardsAllService,
  getBoardIdService,
  addBoardService,
  deleteBoardService,
  updateBoardService,
};
