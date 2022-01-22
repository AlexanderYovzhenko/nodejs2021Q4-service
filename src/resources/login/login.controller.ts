import { FastifyRequest, FastifyReply } from 'fastify';
import statusCode from '../../common/status.code';
import { ILogin } from '../../common/types';
import { addUserServiceAdmin } from './login.service';
import { signToken } from './login.service';
import { setHashPassword } from '../../bcrypt/bcrypt';
import { WrongLoginPasswordError } from '../../errors/custom.errors';

type FastifyRequestLogin = FastifyRequest<{
  Body: ILogin;
  Params: {
    login: string;
    password: string;
  };
}>;

const addLoginRouter = async (
  request: FastifyRequestLogin,
  reply: FastifyReply
) => {
  await addUserServiceAdmin({
    login: 'admin',
    password: await setHashPassword('admin'),
    name: 'admin',
  });
  const { login, password } = request.body;
  const token = await signToken(login, password);

  if (!token) {
    throw new WrongLoginPasswordError('Wrong login/password combination!');
  } else {
    reply.status(statusCode.OK).send({ token });
  }
};

export { addLoginRouter };
