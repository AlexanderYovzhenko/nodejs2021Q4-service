import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fmp from 'fastify-multipart';
import { AppModule } from './app.module';
import { loggerWinston } from './utils/logger-winston.config';
import { config } from './doc/doc-config';
import { LoggingInterceptor } from './utils/logger.middleware';
import { PORT, USE_FASTIFY } from './common/config';

if (USE_FASTIFY === 'true') {
  async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      {
        logger: loggerWinston,
      },
    );
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.register(fmp);
    app.enableCors();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    await app.listen(+PORT || 4000, '0.0.0.0');
  }

  bootstrap();
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: loggerWinston,
    });
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.enableCors();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    await app.listen(+PORT || 4000);
  }

  bootstrap();
}
