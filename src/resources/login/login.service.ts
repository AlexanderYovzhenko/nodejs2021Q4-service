import jwt from 'jsonwebtoken';
import { checkHashPassword } from '../../bcrypt/bcrypt';
import { JWT_SECRET_KEY } from '../../common/config';
import { IUser } from '../../common/types';
import { addUserAdmin, getUserLogin } from './login.repository';

/**
 * Issues a token for the admin user if the password is correct
 * @param login -first argument login
 * @param password -second argument password
 * @returns token
 */
const signToken = async (login: string, password: string) => {
  const user = await getUserLogin(login);

  if (!user) {
    return null;
  }

  if (!(await checkHashPassword(password, user))) {
    return null;
  } else {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY!, {});

    return token;
  }
};

/**
 * Add user admin in database
 * @param userAdmin -first argument userAdmin
 * @returns void
 */
const addUserServiceAdmin = async (userAdmin: Omit<IUser, 'id'>) =>
  await addUserAdmin(userAdmin);

export { signToken, addUserServiceAdmin };
