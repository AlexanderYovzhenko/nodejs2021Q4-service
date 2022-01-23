import { getRepository } from 'typeorm';
import OrmTask from '../tasks/task.model';
import OrmBoard from './board.model';

/**
 * Return array boards(dbBoards)
 * @returns array boards
 */
const getBoardsAll = async (): Promise<OrmBoard[]> => {
  const boards = await getRepository(OrmBoard).find();

  return boards;
};

/**
 * Return object board with ID board equal boardID
 * @param boardID -first argument ID board
 * @returns object board with ID board or null
 */
const getBoardId = async (boardId: string): Promise<OrmBoard | undefined> => {
  const boardID = await getRepository(OrmBoard).findOne(boardId);

  return boardID;
};
// dbBoards.find((board) => board.id === boardId);

/**
 * Add new object board in array boards(dbBoards)
 * @param board -first argument new board
 * @returns void
 */
const addBoard = async (board: OrmBoard): Promise<void> => {
  await getRepository(OrmBoard).insert(board);
};

/**
 * Update object board with ID board equal boardID in array boards(dbBoards)
 * @param boardID -first argument ID board
 * @param updBoard -second argument object update board(updBoard)
 * @returns void
 */
const updateBoard = async (
  boardId: string,
  updBoard: OrmBoard
): Promise<void> => {
  await getRepository(OrmBoard).update(boardId, updBoard);
};

/**
 * Delete object board with ID board equal boardID in array boards(dbBoards)
 * Called function deleteTaskFromBoardService with argument boardId(delete object task with field boardId equal argument boardID)
 * @param boardID -first argument ID board
 * @returns void
 */
const deleteBoard = async (boardId: string): Promise<void> => {
  await getRepository(OrmBoard).delete(boardId);
  await getRepository(OrmTask).delete({ boardId: boardId });
};

export default {
  getBoardsAll,
  getBoardId,
  addBoard,
  updateBoard,
  deleteBoard,
};
