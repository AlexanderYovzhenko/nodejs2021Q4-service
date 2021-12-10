const { FastifyInstance } = require('fastify');
const app: typeof FastifyInstance = require('fastify')({ logger: false });
const fastifySwagger = require('fastify-swagger');
const path = require('path');
const userRouter = require('./resources/users/user.routes/user.router');
const boardRouter = require('./resources/boards/board.routes/board.router');
const taskRouter = require('./resources/tasks/task.routes/task.router');

app.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

module.exports = app;
