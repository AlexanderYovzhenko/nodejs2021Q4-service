import { forwardRef, Module, ValidationPipe } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
// import { Columns } from './entities/column.entity';

@Module({
  controllers: [BoardsController],
  providers: [
    BoardsService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [
    SequelizeModule.forFeature([Board, Task]),
    forwardRef(() => AuthModule),
  ],
})
export class BoardsModule {}
