import bcrypt from 'bcrypt';
import { SALT_HASH_PASSWORD } from '../common/config';
import { IUser } from '../common/types';

const setHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number.parseInt(SALT_HASH_PASSWORD, 10));
  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

const checkHashPassword = async (password: string, user: IUser) => {
  const validPassword = await bcrypt.compare(password, user.password);

  return validPassword;
};

export { setHashPassword, checkHashPassword };
