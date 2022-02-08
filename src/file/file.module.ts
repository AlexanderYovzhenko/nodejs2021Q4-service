import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ConfigDynamicModule } from './config-dynamic.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { USE_FASTIFY } from 'src/common/config';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
  controllers: [new ConfigDynamicModule(USE_FASTIFY).controllerFile()],
  providers: [FileService],
})
export class FileModule {}
