import { FastifyRequest, FastifyReply } from 'fastify';
import userService from '../user.service';
import statusCodeUser from '../../../common/status.code';
import User from '../user.model';
import { IUser } from '../../../common/type';

type FastifyRequestUser = FastifyRequest<{
  Body: IUser;
  Params: {
    userId: string;
  };
}>;

/**
 * Get array users from function getUsersAllService.
 * Install in reply status code (ok) and send in reply array users
 * @param _ -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const getUsersAllRouter = async (_: FastifyRequest, reply: FastifyReply) => {
  const users: object = await userService.getUsersAllService();
  reply.code(statusCodeUser.OK).send(users);
};

/**
 * Get userId from request.params.
 * Get object user from function getUserIdService(userId).
 * Install in reply status code (ok) and send in reply object user
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const getUserIdRouter = async (
  request: FastifyRequestUser,
  reply: FastifyReply
) => {
  const { userId } = request.params;
  const user = await userService.getUserIdService(userId);
  reply.code(statusCodeUser.OK).send(user);
};

/**
 * Get (object user) instance class User(request.body)(add field userID equal uuid).
 * Called function addUserService(add new user).
 * Install in reply status code (created) and send in reply object new user
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const addUserRouter = async (
  request: FastifyRequestUser,
  reply: FastifyReply
) => {
  const user: IUser = new User(request.body);
  await userService.addUserService(user);
  reply.code(statusCodeUser.CREATED).send(user);
};

/**
 * Get userId from request.params.
 * Get (object update user) instance class User(request.body, userID).
 * Called function updateUserService(update object user).
 * Install in reply status code (ok) and send in reply object update user
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const updateUserRouter = async (
  request: FastifyRequestUser,
  reply: FastifyReply
) => {
  const { userId } = request.params;
  const updUser: IUser = new User(request.body, userId);
  await userService.updateUserService(userId, updUser);
  reply.code(statusCodeUser.OK).send(updUser);
};

/**
 * Get userId from request.params.
 * Called function deleteUserService(delete object user).
 * Install in reply status code (no_content)
 * @param request -first argument request
 * @param reply -second argument reply
 * @returns void
 */
const deleteUserRouter = async (
  request: FastifyRequestUser,
  reply: FastifyReply
) => {
  const { userId } = request.params;
  await userService.deleteUserService(userId);
  reply.code(statusCodeUser.NO_CONTENT);
};

export default {
  getUsersAllRouter,
  getUserIdRouter,
  addUserRouter,
  updateUserRouter,
  deleteUserRouter,
};
