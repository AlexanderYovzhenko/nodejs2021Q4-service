import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerWinston } from './utils/logger-winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: loggerWinston,
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
