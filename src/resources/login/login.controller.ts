import { FastifyRequest, FastifyReply } from 'fastify';
import statusCode from '../../common/status.code';
import { ILogin } from '../../common/types';
import { addUserServiceAdmin } from './login.service';
import { signToken } from './login.service';
import { logger, getLogObject } from '../../logging/logger';

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
    password: 'admin',
    name: 'admin',
  });
  const { login, password } = request.body;
  const token = await signToken(login, password);

  if (!token) {
    reply
      .status(statusCode.FORBIDDEN)
      .send('Wrong login/password combination!');
    logger.error(getLogObject(request, reply));
  } else {
    reply.status(statusCode.OK).send({ token });

    logger.info(getLogObject(request, reply));
  }
};

export { addLoginRouter };
