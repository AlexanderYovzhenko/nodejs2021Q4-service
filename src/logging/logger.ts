import winston from 'winston';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { LEVEL_LOG } from '../common/config';
import { ILevelLog } from '../common/types';

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
      filename: 'logs/errors.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
    new winston.transports.Console({
      format: winston.format.cli({}),
    }),
  ],
});

const getLogObject = (
  request: FastifyRequest,
  reply: FastifyReply,
  error?: FastifyError
) => {
  const logEntries = {
    method: request.method,
    url: request.url,
    parameters: request.params,
    queryParams: request.query,
    body: request.body,
    statusCode: reply.statusCode,
  };

  if (error) {
    return JSON.stringify({
      message: error.message || '',
      ...logEntries,
    });
  }

  return JSON.stringify({
    ...logEntries,
  });
};

export { logger, getLogObject };
