import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { loggerWinston } from './utils/logger-winston.config';
import { config } from './doc/doc-config';
console.log(process.env.USE_FASTIFY);

if (process.env.USE_FASTIFY) {
  async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      {
        logger: loggerWinston,
      },
    );
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    await app.listen(process.env.PORT || 4000, '0.0.0.0');
  }

  bootstrap();
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
      logger: loggerWinston,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    await app.listen(process.env.PORT || 4000);
  }

  bootstrap();
}
