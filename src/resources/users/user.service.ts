import usersRepo from './user.memory.repository';
import taskServiceUser from '../tasks/task.service';
import { IUser } from '../../common/type';
import OrmUser from './user.model';

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
const getUserIdService = async (userId: string): Promise<object | undefined> =>
  await usersRepo.getUserId(userId);

/**
 * Intermediate function
 * Called function addUser with argument user(add new user in array users)
 * @param user -first argument new user
 * @returns void
 */
const addUserService = async (newUser: OrmUser) => {
  await usersRepo.addUser(newUser);
};

/**
 * Intermediate function
 * Called function updateUser with arguments userId and updUser(update object user with ID user equal userID)
 * @param userID -first argument ID user
 * @param updUser -second argument object update user(updUser)
 * @returns void
 */
const updateUserService = async (userId: string, updUser: IUser) => {
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

export default {
  getUsersAllService,
  getUserIdService,
  addUserService,
  updateUserService,
  deleteUserService,
};
