import { FastifyRequest, FastifyReply } from 'fastify';
import statusCode from '../../common/status.code';
import { ILogin } from '../../common/types';
import { addUserServiceAdmin } from './login.service';
import { signToken } from './login.service';
import { setHashPassword } from '../../bcrypt/bcrypt';

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
    reply
      .status(statusCode.FORBIDDEN)
      .send('Wrong login/password combination!');
  } else {
    reply.status(statusCode.OK).send({ token });
  }
};

export { addLoginRouter };
