let dbUsers = [];

const getUsersAll = async () => dbUsers;

const getUserId = async (id) => dbUsers.find(el => el.id === id);

const addUser = async (user) => dbUsers.push(user);

const updateUser = async (userId, updUser) => {dbUsers = dbUsers.map(el => el.id === userId ? updUser : el)};

const deleteUser = async (userId) => {dbUsers = dbUsers.filter(el => el.id !== userId)};

module.exports = { 
  getUsersAll,
  getUserId,
  addUser,
  updateUser,
  deleteUser
};
