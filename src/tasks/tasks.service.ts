import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskRepository.create(createTaskDto);
    return task;
  }

  async findAll() {
    const tasks = await this.taskRepository.findAll();
    return tasks;
  }

  async findOne(id: string) {
    const taskOne = await this.taskRepository.findOne({ where: { id } });
    return taskOne;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update({ ...updateTaskDto }, { where: { id } });
    const taskUpdate = await this.taskRepository.findOne({ where: { id } });
    return taskUpdate;
  }

  async remove(id: string) {
    await this.taskRepository.destroy({
      restartIdentity: true,
      where: { id },
    });
  }
}
