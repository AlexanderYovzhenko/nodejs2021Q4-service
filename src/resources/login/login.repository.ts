import { getRepository } from 'typeorm';
import { IUser } from '../../common/types';
import OrmUser from '../users/user.model';

const getUserLogin = async (userLogin: string): Promise<IUser | undefined> => {
  const loginUser = await getRepository(OrmUser).findOne({
    where: { login: userLogin },
  });

  return loginUser;
};

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
