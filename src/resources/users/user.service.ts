const usersRepo = require('./user.memory.repository');
const taskServiceUser = require('../tasks/task.service');

/**
 * Intermediate function
 * Called function getUsersAll(return array users)
 * @returns the results work function getUsersAll, (array users)
 */
const getUsersAllService = async (): Promise<object> =>
  await usersRepo.getUsersAll();

/**
 * Intermediate function
 * Called function getUserId with argument userId(return object user)
 * @param userID -first argument ID user
 * @returns the result work function getUserId, (object user)
 */
const getUserIdService = async (userId: string): Promise<object> =>
  await usersRepo.getUserId(userId);

/**
 * Intermediate function
 * Called function addUser with argument user(add new user in array users)
 * @param user -first argument new user
 * @returns void
 */
const addUserService = async (user: object) => {
  await usersRepo.addUser(user);
};

/**
 * Intermediate function
 * Called function updateUser with arguments userId and updUser(update object user with ID user equal userID)
 * @param userID -first argument ID user
 * @param updUser -second argument object update user(updUser)
 * @returns void
 */
const updateUserService = async (userId: string, updUser: object) => {
  await usersRepo.updateUser(userId, updUser);
};

/**
 * Intermediate function
 * Called function deleteUser with argument userId(delete object user with ID user equal userID).
 * Called function updateUserIdService with argument userId(update field userID at object task on null)
 * @param userID -first argument ID user
 * @returns void
 */
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
