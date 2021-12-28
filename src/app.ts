import Fastify, { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import fastifySwagger, { SwaggerOptions } from 'fastify-swagger';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import userRouter from './resources/users/user.routes/user.router';
import boardRouter from './resources/boards/board.routes/board.router';
import taskRouter from './resources/tasks/task.routes/task.router';
import errorsHandler from './errors/errors.handler';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

app.register(fastifySwagger, optsSwagger);

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

// throw Error('Oops!');

// Promise.reject(Error('Oops!'));
