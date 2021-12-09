const {
  FastifyRequest: FastifyRequestUser,
  FastifyReply: FastifyReplyUser,
} = require('fastify');
const userService = require('../user.service');
const statusCodeUser = require('../../../common/status.code');
const User = require('../user.model');

const getUsersAllRouter = async (
  _: typeof FastifyRequestUser,
  reply: typeof FastifyReplyUser
) => {
  const users: object = await userService.getUsersAllService();
  reply.code(statusCodeUser.OK).send(users);
};

const getUserIdRouter = async (
  request: typeof FastifyRequestUser,
  reply: typeof FastifyReplyUser
) => {
  const { userId } = request.params;
  const user: object = await userService.getUserIdService(userId);
  reply.code(statusCodeUser.OK).send(user);
};

const addUserRouter = async (
  request: typeof FastifyRequestUser,
  reply: typeof FastifyReplyUser
) => {
  const user: object = new User(request.body);
  await userService.addUserService(user);
  reply.code(statusCodeUser.CREATED).send(user);
};

const updateUserRouter = async (
  request: typeof FastifyRequestUser,
  reply: typeof FastifyReplyUser
) => {
  const { userId } = request.params;
  const updUser: object = new User(request.body, userId);
  await userService.updateUserService(userId, updUser);
  reply.code(statusCodeUser.OK).send(updUser);
};

const deleteUserRouter = async (
  request: typeof FastifyRequestUser,
  reply: typeof FastifyReplyUser
) => {
  const { userId } = request.params;
  await userService.deleteUserService(userId);
  reply.code(statusCodeUser.NO_CONTENT);
};

module.exports = {
  getUsersAllRouter,
  getUserIdRouter,
  addUserRouter,
  updateUserRouter,
  deleteUserRouter,
};
