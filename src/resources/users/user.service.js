const { v4: uuid } = require('uuid')
const usersRepo = require('./user.memory.repository');
const { updateUserId } = require('../tasks/task.memory.repository');

const getUsersAll = async (request, reply) => {
  const users = await usersRepo.getUsersAll();
  reply.code(200).send(users);
};

const getUserId = async (request, reply) => {
  const { userId } = request.params;
  const user = await usersRepo.getUserId(userId);
  reply.code(200).send(user);
};

const addUser = async (request, reply) => {
  const user = {
    id: uuid(),
    ...request.body
  };
  usersRepo.addUser(user);
  reply.code(201).send(user);
};

const updateUser = async (request, reply) => {
  const { userId } = request.params;
  const updUser = {
    id: userId,
    ...request.body
  };
  usersRepo.updateUser(userId, updUser); 
  reply.code(200).send(updUser);
};

const deleteUser = async (request, reply) => {
  const { userId } = request.params;
  usersRepo.deleteUser(userId);
  await updateUserId(userId);
  reply.code(204);
};

module.exports = { getUsersAll, getUserId, addUser, updateUser, deleteUser };
