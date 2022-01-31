import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  HttpStatus,
  UseGuards,
  NotFoundException,
  UseFilters,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { AllExceptionsFilter } from 'src/exception-filters/all-exceptions.filter';

@ApiTags('Tasks')
@ApiHeader({
  name: 'header',
  description: 'Authorization Bearer token',
  schema: {
    type: 'string',
    default: 'Bearer token',
  },
})
@UseGuards(AuthGuard)
@UseFilters(AllExceptionsFilter)
@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'task creation' })
  @ApiResponse({ status: 201, type: CreateTaskDto })
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('boardId', ParseUUIDPipe) boardId: string,
  ) {
    createTaskDto.boardId = boardId;
    return await this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'get all tasks' })
  @ApiResponse({ status: 200, type: [CreateTaskDto] })
  @Get()
  async findAll(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return await this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'get task by id' })
  @ApiResponse({ status: 200, type: CreateTaskDto })
  @Get(':taskId')
  async findOne(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('boardId', ParseUUIDPipe) boardId: string,
  ) {
    if (await this.tasksService.findOne(taskId)) {
      return await this.tasksService.findOne(taskId);
    } else {
      throw new NotFoundException('Task not found!');
    }
  }

  @ApiOperation({ summary: 'update task by id' })
  @ApiResponse({ status: 200, type: UpdateTaskDto })
  @Put(':taskId')
  async update(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() updateUserDto: UpdateTaskDto,
  ) {
    if (await this.tasksService.findOne(taskId)) {
      return await this.tasksService.update(taskId, updateUserDto);
    } else {
      throw new NotFoundException('Task not found!');
    }
  }

  @ApiOperation({ summary: 'delete task by id' })
  @ApiResponse({ status: 204 })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':taskId')
  async remove(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('boardId', ParseUUIDPipe) boardId: string,
  ) {
    if (await this.tasksService.findOne(taskId)) {
      await this.tasksService.remove(taskId);
    } else {
      throw new NotFoundException('Task not found!');
    }
  }
}
