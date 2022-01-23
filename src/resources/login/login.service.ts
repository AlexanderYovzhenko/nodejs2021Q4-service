import jwt from 'jsonwebtoken';
import { checkHashPassword } from '../../bcrypt/bcrypt';
import { JWT_SECRET_KEY } from '../../common/config';
import { IUser } from '../../common/types';
import { addUserAdmin, getUserLogin } from './login.repository';

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

const addUserServiceAdmin = async (obj: Omit<IUser, 'id'>) =>
  await addUserAdmin(obj);

export { signToken, addUserServiceAdmin };
