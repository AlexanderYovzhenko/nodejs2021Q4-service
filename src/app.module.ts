import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { BoardsController } from './boards/boards.controller';
import { TasksModule } from './tasks/tasks.module';
import { BoardsService } from './boards/boards.service';
import { User } from './users/entities/user.entity';
import { Board } from './boards/entities/board.entity';
import { Task } from './tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
// import { Columns } from './boards/entities/column.entity';
// import { loggerWinston } from './utils/logger.winston.settings';

@Module({
  imports: [
    BoardsModule,
    UsersModule,
    TasksModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forFeature([User, Board, Task]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Task, Board],
      autoLoadModels: true,
      // synchronize: false,
      logging: false,
    }),
  ],
  controllers: [
    AppController,
    // UsersController,
    // BoardsController,
    // AuthController,
  ],
  providers: [
    AppService,
    // UsersService,
    // BoardsService,
    // AuthService,
    // LoggerMiddleware,
  ],
  // exports: [LoggerMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
