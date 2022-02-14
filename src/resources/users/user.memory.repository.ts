import { getRepository } from 'typeorm';
import OrmUser from './user.model';
import { IUser } from '../../common/type';

/**
 * Returns array users(dbUsers)
 * @returns array dbUsers
 */
const getUsersAll = async (): Promise<IUser[]> => {
  const dbUsers = await getRepository(OrmUser).find();

  return dbUsers;
};

/**
 * Returns object user with ID user equal userID
 * @param userID -first argument ID user
 * @returns Object user with ID user or null
 */
const getUserId = async (userId: string): Promise<IUser | undefined> => {
  const idUsers = await getRepository(OrmUser).findOne(userId);

  return idUsers;
};

/**
 * Add object new user in array users(dbUsers)
 * @param user -first argument new user
 * @returns Promise<IUser>
 */
const addUser = async (newUser: OrmUser): Promise<IUser> => {
  const user = await getRepository(OrmUser).save(newUser);

  return user;
};

/**
 * Update object user with ID user equal userID in array users(dbUsers)
 * @param userID -first argument ID user
 * @param updUser -second argument object update user(updUser)
 * @returns Promise<IUser>
 */
const updateUser = async (userId: string, updUser: IUser): Promise<IUser> => {
  const updateUser = await getRepository(OrmUser).update(userId, updUser);

  return updateUser.raw;
};

/**
 * Delete object user with ID user equal userID in array users(dbUsers)
 * @param userID -first argument ID user
 * @returns void
 */
const deleteUser = async (userId: string): Promise<void> => {
  await getRepository(OrmUser).delete(userId);
};

export default {
  getUsersAll,
  getUserId,
  addUser,
  updateUser,
  deleteUser,
};
