import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { loggerWinston } from './utils/logger-winston.config';
import { config } from './doc/doc-config';

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
