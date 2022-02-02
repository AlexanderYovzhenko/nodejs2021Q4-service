import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ConfigDinamicModule } from './config-dinamic.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
  controllers: [
    new ConfigDinamicModule(process.env.USE_FASTIFY).controllerFile(),
  ],
  providers: [FileService],
})
export class FileModule {}
