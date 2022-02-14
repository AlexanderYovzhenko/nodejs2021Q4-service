let dbBoards = [];

const getBoardsAll = async () => dbBoards;

const getBoardId = async (boardId) => dbBoards.find(board => board.id === boardId) || null;

const addBoard = async (board) => dbBoards.push(board);

const updateBoard = async (boardId, updBoard) => {
  dbBoards = dbBoards.map(board => board.id === boardId ? updBoard : board);
};

const deleteBoard = async (boardId) => {
  dbBoards = dbBoards.filter(board => board.id !== boardId);
};

module.exports = { 
  getBoardsAll,
  getBoardId,
  addBoard,
  updateBoard,
  deleteBoard
};
