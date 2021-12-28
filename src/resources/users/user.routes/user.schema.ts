import userHandlerRouters from './user.controller';

const user = {
  type: 'object',
  required: ['name', 'login', 'password'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: user,
      },
    },
  },
  handler: userHandlerRouters.getUsersAllRouter,
};

const getUserOpts = {
  schema: {
    response: {
      200: user,
    },
  },
  handler: userHandlerRouters.getUserIdRouter,
};

const addUserOpts = {
  schema: {
    body: user,
    response: {
      201: user,
    },
  },
  handler: userHandlerRouters.addUserRouter,
};

const deleteUserOpts = {
  schema: {
    response: {
      204: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: userHandlerRouters.deleteUserRouter,
};

const updateUserOpts = {
  schema: {
    body: user,
    response: {
      200: user,
    },
  },
  handler: userHandlerRouters.updateUserRouter,
};

export default {
  getUsersOpts,
  getUserOpts,
  addUserOpts,
  deleteUserOpts,
  updateUserOpts,
};
