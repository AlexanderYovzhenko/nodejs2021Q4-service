import { FastifyRequest, FastifyReply } from 'fastify';
import userService from '../user.service';
import statusCode from '../../../common/status.code';
import User from '../user.model';
import { IUser } from '../../../common/type';
import { logger, logCollect } from '../../../common/logger';
import { NotFoundError } from '../../../errors/custom.errors';

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
  const users = await userService.getUsersAllService();
  reply.code(statusCode.OK).send(users);
  logger.info(logCollect(_, reply));
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

  if (await userService.getUserIdService(userId)) {
    const user = await userService.getUserIdService(userId);
    reply.code(statusCode.OK).send(user);
    logger.info(logCollect(request, reply));
  } else {
    throw new NotFoundError('Not found user');
  }
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
  reply.code(statusCode.CREATED).send(user);
  logger.info(logCollect(request, reply));
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

  if (await userService.getUserIdService(userId)) {
    const updUser: IUser = new User(request.body, userId);
    await userService.updateUserService(userId, updUser);
    reply.code(statusCode.OK).send(updUser);
    logger.info(logCollect(request, reply));
  } else {
    throw new NotFoundError('Not found user');
  }
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

  if (await userService.getUserIdService(userId)) {
    await userService.deleteUserService(userId);
    reply.code(statusCode.NO_CONTENT);
    logger.info(logCollect(request, reply));
  } else {
    throw new NotFoundError('Not found user');
  }
};

export default {
  getUsersAllRouter,
  getUserIdRouter,
  addUserRouter,
  updateUserRouter,
  deleteUserRouter,
};