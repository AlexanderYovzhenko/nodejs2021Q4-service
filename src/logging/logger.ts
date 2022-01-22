import winston from 'winston';
import { FastifyRequest, FastifyReply } from 'fastify';
import { LEVEL_LOG } from '../common/config';
import { ILevelLog } from '../common/types';

const levelLog: ILevelLog = {
  0: 'error',
  1: 'warn',
  2: 'info',
  3: 'debug',
  4: 'silly',
};

winston.addColors({
  info: 'bold blue',
  warn: 'italic yellow',
  error: 'bold red',
  debug: 'green',
});

const colorizer = winston.format.colorize();

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
      format: winston.format.printf((msg) =>
        colorizer.colorize(
          msg.level,
          `${msg.timestamp} - ${msg.level}: ${
            msg.message || JSON.stringify(msg)
          }`
        )
      ),
    }),
  ],
});

const getLogObject = (request: FastifyRequest, reply: FastifyReply) => {
  const logEntries = {
    message: reply.raw.statusMessage || '',
    method: request.method,
    url: request.url,
    parameters: request.params,
    queryParams: request.query,
    body: request.body,
    statusCode: reply.statusCode,
  };

  return JSON.stringify({
    ...logEntries,
  });
};

const responseLogger = (request: FastifyRequest, reply: FastifyReply) => {
  if (+reply.statusCode >= 400) {
    logger.error(getLogObject(request, reply));
  } else {
    logger.info(getLogObject(request, reply));
  }
};

export { logger, responseLogger };
