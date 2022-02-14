import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/entities/user.entity';
import { Board } from './boards/entities/board.entity';
import { Task } from './tasks/entities/task.entity';
import { ColumnBoard } from './columns/entities/column.entity';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ColumnsModule } from './columns/columns.module';
import config from './ormconfig';

@Module({
  imports: [
    BoardsModule,
    UsersModule,
    TasksModule,
    ColumnsModule,
    AuthModule,
    FileModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([User, Board, Task, ColumnBoard]),
    TypeOrmModule.forRoot(config),
    FileModule,
    ColumnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
