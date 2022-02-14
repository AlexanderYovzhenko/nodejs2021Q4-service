import { IUser } from '../../common/type';

let dbUsers: IUser[] = [];

/**
 * Returns array users(dbUsers)
 * @returns array dbUsers
 */
const getUsersAll = async (): Promise<IUser[]> => dbUsers;

/**
 * Returns object user with ID user equal userID
 * @param userID -first argument ID user
 * @returns Object user with ID user or null
 */
const getUserId = async (userId: string): Promise<IUser | undefined> =>
  dbUsers.find((user) => user.id === userId);

/**
 * Add object new user in array users(dbUsers)
 * @param user -first argument new user
 * @returns void
 */
const addUser = async (user: IUser): Promise<void> => {
  dbUsers.push(user);
};

/**
 * Update object user with ID user equal userID in array users(dbUsers)
 * @param userID -first argument ID user
 * @param updUser -second argument object update user(updUser)
 * @returns void
 */
const updateUser = async (userId: string, updUser: IUser): Promise<void> => {
  dbUsers = dbUsers.map((user) => (user.id === userId ? updUser : user));
};

/**
 * Delete object user with ID user equal userID in array users(dbUsers)
 * @param userID -first argument ID user
 * @returns void
 */
const deleteUser = async (userId: string): Promise<void> => {
  dbUsers = dbUsers.filter((user: IUser): boolean => user.id !== userId);
};

export default {
  getUsersAll,
  getUserId,
  addUser,
  updateUser,
  deleteUser,
};
