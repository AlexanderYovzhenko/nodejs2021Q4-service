import boardsRepo from './board.repository';
import OrmBoard from './board.model';

/**
 * Intermediate function
 * Called function getBoardsAll(return array boards)
 * @returns the results work function getBoardsAll, (array boards)
 */
const getBoardsAllService = async (): Promise<object> =>
  await boardsRepo.getBoardsAll();

/**
 * Intermediate function
 * Called function getBoardId with argument boardId(return object board)
 * @param boardID -first argument ID board
 * @returns the result work function getBoardId, (object board)
 */
const getBoardIdService = async (
  boardId: string
): Promise<object | undefined> => await boardsRepo.getBoardId(boardId);

/**
 * Intermediate function
 * Called function addBoard with argument board(add new board in array boards)
 * @param board -first argument new board
 * @returns void
 */
const addBoardService = async (board: OrmBoard) => {
  await boardsRepo.addBoard(board);
};

/**
 * Intermediate function
 * Called function updateBoard with arguments boardId and updBoard(update object board with ID board equal boardID)
 * @param boardID -first argument ID board
 * @param updBoard -second argument object update board(updBoard)
 * @returns void
 */
const updateBoardService = async (boardId: string, updBoard: OrmBoard) => {
  await boardsRepo.updateBoard(boardId, updBoard);
};

/**
 * Intermediate function
 * Called function deleteBoard with argument boardId(delete object board with ID board equal boardID).
 * @param boardID -first argument ID board
 * @returns void
 */
const deleteBoardService = async (boardId: string) => {
  await boardsRepo.deleteBoard(boardId);
};

export default {
  getBoardsAllService,
  getBoardIdService,
  addBoardService,
  deleteBoardService,
  updateBoardService,
};
