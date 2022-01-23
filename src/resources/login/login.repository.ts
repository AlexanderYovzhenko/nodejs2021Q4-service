import { getRepository } from 'typeorm';
import { IUser } from '../../common/types';
import OrmUser from '../users/user.model';

/**
 * Find user admin in database
 * @param userLogin -first argument userLogin
 * @returns userAdmin
 */
const getUserLogin = async (userLogin: string): Promise<IUser | undefined> => {
  const userAdmin = await getRepository(OrmUser).findOne({
    where: { login: userLogin },
  });

  return userAdmin;
};

/**
 * Add user admin in database if user admin not found
 * @param newUserAdmin -first argument newUserAdmin
 * @returns void
 */
const addUserAdmin = async (newUserAdmin: Omit<IUser, 'id'>) => {
  const userAdmin = await getRepository(OrmUser).findOne({
    where: { login: newUserAdmin.login },
  });

  if (!userAdmin) {
    await getRepository(OrmUser).save(newUserAdmin);

    return;
  }

  return;
};

export { addUserAdmin, getUserLogin };
