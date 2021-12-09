interface IBoard {
  id: string;
  title: string;
  columns: {
    columnId: string;
    title: string;
    order: number;
  };
}

let dbBoards: IBoard[] = [];

const getBoardsAll = async () => dbBoards;

const getBoardId = async (boardId: string) =>
  dbBoards.find((board) => board.id === boardId) || null;

const addBoard = async (board: IBoard) => dbBoards.push(board);

const updateBoard = async (boardId: string, updBoard: IBoard) => {
  dbBoards = dbBoards.map((board) => (board.id === boardId ? updBoard : board));
};

const deleteBoard = async (boardId: string) => {
  dbBoards = dbBoards.filter((board): boolean => board.id !== boardId);
};

module.exports = {
  getBoardsAll,
  getBoardId,
  addBoard,
  updateBoard,
  deleteBoard,
};
