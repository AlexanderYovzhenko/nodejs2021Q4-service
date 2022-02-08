import { WinstonModule } from 'nest-winston';
import { LEVEL_LOG } from 'src/common/config';
import { format, transports } from 'winston';

const levels = {
  0: 'error',
  1: 'warn',
  2: 'info',
  3: 'http',
  4: 'verbose',
  5: 'debug',
  6: 'silly',
};

export const loggerWinston = WinstonModule.createLogger({
  exitOnError: false,
  level: levels[LEVEL_LOG],
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.simple(),
  ),
  defaultMeta: { service: 'REST-service' },
  transports: [
    new transports.File({
      filename: 'logs/errors.log',
      level: 'error',
    }),
    new transports.File({ filename: 'logs/all.log' }),
    new transports.Console({
      format: format.printf((msg) =>
        format
          .colorize()
          .colorize(
            msg.level,
            `${msg.timestamp} - ${msg.level}: ${
              msg.message || JSON.stringify(msg)
            }`,
          ),
      ),
    }),
  ],
});
