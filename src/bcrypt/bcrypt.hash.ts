import * as bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../common/config';

export const setHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number.parseInt(SALT_ROUNDS, 10));
  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};
