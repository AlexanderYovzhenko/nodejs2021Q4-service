import Fastify, { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import fastifySwagger, { SwaggerOptions } from 'fastify-swagger';
import path from 'path';

import loginRouter from './resources/login/login.router';
import userRouter from './resources/users/user.routes/user.router';
import boardRouter from './resources/boards/board.routes/board.router';
import taskRouter from './resources/tasks/task.routes/task.router';
import errorsHandler from './errors/errors.handler';
import { checkToken } from './tokens/check.token';

export const app: FastifyInstance = Fastify({
  logger: false,
});

errorsHandler();

const optsSwagger: FastifyRegisterOptions<SwaggerOptions> | undefined = {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: '',
  },
};

app.addHook('preHandler', checkToken);

app.register(fastifySwagger, optsSwagger);

app.register(loginRouter);
app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

// throw new Error('Oops!');

// Promise.reject(Error('Oops!'));
