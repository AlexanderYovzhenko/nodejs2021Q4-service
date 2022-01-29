import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(AuthGuard)
@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
  ) {
    createTaskDto.boardId = boardId;
    return await this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get(':taskId')
  async findOne(
    @Param('taskId') taskId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.tasksService.findOne(taskId)) {
      return await this.tasksService.findOne(taskId);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Task not found!');
    }
  }

  @Put(':taskId')
  async update(
    @Param('taskId') taskId: string,
    @Res({ passthrough: true }) res: Response,
    @Body() updateUserDto: UpdateTaskDto,
  ) {
    if (await this.tasksService.findOne(taskId)) {
      return await this.tasksService.update(taskId, updateUserDto);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Task not found!');
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':taskId')
  async remove(
    @Param('taskId') taskId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.tasksService.findOne(taskId)) {
      await this.tasksService.remove(taskId);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Task not found!');
    }
  }
}
