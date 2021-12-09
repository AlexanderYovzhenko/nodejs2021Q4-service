const usersRepo = require('./user.memory.repository');
const taskServiceUser = require('../tasks/task.service');

const getUsersAllService = async (): Promise<object> =>
  await usersRepo.getUsersAll();

const getUserIdService = async (userId: string): Promise<object> =>
  await usersRepo.getUserId(userId);

const addUserService = async (user: object) => {
  await usersRepo.addUser(user);
};

const updateUserService = async (userId: string, updUser: object) => {
  await usersRepo.updateUser(userId, updUser);
};

const deleteUserService = async (userId: string) => {
  await usersRepo.deleteUser(userId);
  await taskServiceUser.updateUserIdService(userId);
};

module.exports = {
  getUsersAllService,
  getUserIdService,
  addUserService,
  updateUserService,
  deleteUserService,
};
