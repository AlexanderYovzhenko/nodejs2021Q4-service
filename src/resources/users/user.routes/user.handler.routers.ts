const { FastifyRequest, FastifyReply } = require('fastify');
import { v4 as uuid } from 'uuid';
const userService = require('../user.service');

const getUsersAll = async (
  _: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const users: object = await userService.getUsersAllService();
  reply.code(200).send(users);
};

const getUserId = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { userId } = request.params;
  const user: object = await userService.getUserIdService(userId);
  reply.code(200).send(user);
};

const addUser = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const user: object = {
    id: uuid(),
    ...request.body,
  };
  await userService.addUserService(user);
  reply.code(201).send(user);
};

const updateUser = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { userId } = request.params;
  const updUser: object = {
    id: userId,
    ...request.body,
  };
  await userService.updateUserService(userId, updUser);
  reply.code(200).send(updUser);
};

const deleteUser = async (
  request: typeof FastifyRequest,
  reply: typeof FastifyReply
) => {
  const { userId } = request.params;
  await userService.deleteUserService(userId);
  reply.code(204);
};

module.exports = {
  getUsersAll,
  getUserId,
  addUser,
  updateUser,
  deleteUser,
};
