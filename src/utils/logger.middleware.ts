import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, params, query, body } = request;
    const { statusCode } = response;
    const service = 'REST-service';

    const messageLog = `${method} Url:${originalUrl} statusCode:${statusCode} params:${JSON.stringify(
      params,
    )} queryParams:${JSON.stringify(query)} body:${JSON.stringify(
      body,
    )} service:${service}`;

    response.on('finish', () => {
      if (response.statusCode < 400) {
        this.logger.log(messageLog);
      } else {
        this.logger.error(messageLog);
      }
    });

    next();
  }
}
