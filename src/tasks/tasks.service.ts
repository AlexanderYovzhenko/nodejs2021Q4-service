import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.tasksRepository.save(createTaskDto);
    return task;
  }

  async findAll() {
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  async findOne(id: string) {
    const taskOne = await this.tasksRepository.findOne({ where: { id } });
    return taskOne;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.update(id, { ...updateTaskDto });
    const taskUpdate = await this.tasksRepository.findOne({ where: { id } });
    return taskUpdate;
  }

  async remove(id: string) {
    await this.tasksRepository.delete(id);
  }
}
