let dbUsers = [];

const getUsersAll = async () => dbUsers;

const getUserId = async (userId) => dbUsers.find(user => user.id === userId);

const addUser = async (user) => dbUsers.push(user);

const updateUser = async (userId, updUser) => {
  dbUsers = dbUsers.map(user => user.id === userId ? updUser : user);
};

const deleteUser = async (userId) => {
  dbUsers = dbUsers.filter(user => user.id !== userId)
};

module.exports = { 
  getUsersAll,
  getUserId,
  addUser,
  updateUser,
  deleteUser
};
