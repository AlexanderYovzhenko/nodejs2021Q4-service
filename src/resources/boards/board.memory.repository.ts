import { IBoard } from '../../common/type';

let dbBoards: IBoard[] = [];

/**
 * Return array boards(dbBoards)
 * @returns array dbBoards
 */
const getBoardsAll = async (): Promise<IBoard[]> => dbBoards;

/**
 * Return object board with ID board equal boardID
 * @param boardID -first argument ID board
 * @returns object board with ID board or null
 */
const getBoardId = async (boardId: string): Promise<IBoard | undefined> =>
  dbBoards.find((board) => board.id === boardId);

/**
 * Add new object board in array boards(dbBoards)
 * @param board -first argument new board
 * @returns void
 */
const addBoard = async (board: IBoard): Promise<void> => {
  dbBoards.push(board);
};

/**
 * Update object board with ID board equal boardID in array boards(dbBoards)
 * @param boardID -first argument ID board
 * @param updBoard -second argument object update board(updBoard)
 * @returns void
 */
const updateBoard = async (
  boardId: string,
  updBoard: IBoard
): Promise<void> => {
  dbBoards = dbBoards.map((board) => (board.id === boardId ? updBoard : board));
};

/**
 * Delete object board with ID board equal boardID in array boards(dbBoards)
 * @param boardID -first argument ID board
 * @returns void
 */
const deleteBoard = async (boardId: string): Promise<void> => {
  dbBoards = dbBoards.filter((board): boolean => board.id !== boardId);
};

export default {
  getBoardsAll,
  getBoardId,
  addBoard,
  updateBoard,
  deleteBoard,
};
