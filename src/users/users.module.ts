import { forwardRef, Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [
    SequelizeModule.forFeature([User, Task]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
