import winston from 'winston';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { LEVEL_LOG } from './config';

interface ILevelLog {
  [key: string]: string;
}

const levelLog: ILevelLog = {
  0: 'error',
  1: 'warn',
  2: 'info',
  3: 'debug',
  4: 'silly',
};

const logger = winston.createLogger({
  level: levelLog[LEVEL_LOG],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.simple()
  ),
  defaultMeta: { service: 'REST-service' },
  transports: [
    new winston.transports.File({
      filename: 'src/logs/errors.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'src/logs/all.log' }),
    new winston.transports.Console({
      format: winston.format.cli(),
    }),
  ],
});

const logCollect = (
  request: FastifyRequest,
  reply: FastifyReply,
  error?: FastifyError
) => {
  const objectLog = {
    method: request.method,
    url: request.url,
    parameters: request.params,
    queryParams: request.query,
    body: request.body,
    statusCode: reply.statusCode,
  };

  if (error && request && reply) {
    return JSON.stringify({
      message: error.message || '',
      ...objectLog,
    });
  } else {
    return JSON.stringify({
      ...objectLog,
    });
  }
};

export { logger, logCollect };
