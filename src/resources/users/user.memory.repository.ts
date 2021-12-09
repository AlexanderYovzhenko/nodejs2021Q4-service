interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

let dbUsers: IUser[] = [];

const getUsersAll = async () => dbUsers;

const getUserId = async (userId: string) =>
  dbUsers.find((user) => user.id === userId);

const addUser = async (user: IUser) => dbUsers.push(user);

const updateUser = async (userId: string, updUser: IUser) => {
  dbUsers = dbUsers.map((user) => {
    return user.id === userId ? updUser : user;
  });
};

const deleteUser = async (userId: string) => {
  dbUsers = dbUsers.filter((user: IUser): boolean => user.id !== userId);
};

module.exports = {
  getUsersAll,
  getUserId,
  addUser,
  updateUser,
  deleteUser,
};
