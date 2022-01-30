import { forwardRef, Module, ValidationPipe } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
// import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [SequelizeModule.forFeature([Task]), forwardRef(() => AuthModule)],
  // exports: [TasksService],
})
export class TasksModule {}
