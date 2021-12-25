import statusCode from '../common/status.code';

class NotFoundError extends Error {
  status: number;
  constructor(msg: string) {
    super(msg);
    this.name = 'NotFoundError';
    this.status = statusCode.NOT_FOUND;
  }
}

export { NotFoundError };
