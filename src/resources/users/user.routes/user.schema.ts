const userHandlerRouters = require('./user.handler.routers');

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
  handler: userHandlerRouters.getUsersAll,
};

const getUserOpts = {
  schema: {
    response: {
      200: user,
    },
  },
  handler: userHandlerRouters.getUserId,
};

const addUserOpts = {
  schema: {
    body: user,
    response: {
      201: user,
    },
  },
  handler: userHandlerRouters.addUser,
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
  handler: userHandlerRouters.deleteUser,
};

const updateUserOpts = {
  schema: {
    body: user,
    response: {
      200: user,
    },
  },
  handler: userHandlerRouters.updateUser,
};

module.exports = {
  getUsersOpts,
  getUserOpts,
  addUserOpts,
  deleteUserOpts,
  updateUserOpts,
};
