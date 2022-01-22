import statusCode from '../common/status.code';

class NotFoundError extends Error {
  status: number;
  constructor(msg: string) {
    super(msg);
    this.name = 'NotFoundError';
    this.status = statusCode.NOT_FOUND;
  }
}

class WrongLoginPasswordError extends Error {
  status: number;
  constructor(msg: string) {
    super(msg);
    this.name = 'Wrong login/password combination';
    this.status = statusCode.FORBIDDEN;
  }
}

class AuthorizationError extends Error {
  status: number;
  constructor(msg: string) {
    super(msg);
    this.name = 'Authorization Error';
    this.status = statusCode.UNAUTHORIZED;
  }
}

export { NotFoundError, WrongLoginPasswordError, AuthorizationError };
