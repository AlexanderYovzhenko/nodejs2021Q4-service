import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from 'src/tasks/entities/task.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board) private boardsRepository: typeof Board,
    @InjectModel(Task) private tasksRepository: typeof Task,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const board = await this.boardsRepository.create(createBoardDto);
    return board;
  }

  async findAll() {
    const boards = await this.boardsRepository.findAll();
    return boards;
  }

  async findOne(id: string) {
    const boardOne = await this.boardsRepository.findOne({ where: { id } });
    return boardOne;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    await this.boardsRepository.update(
      { ...updateBoardDto },
      { where: { id } },
    );
    const boardUpdate = await this.boardsRepository.findOne({ where: { id } });
    return boardUpdate;
  }

  async remove(id: string) {
    await this.boardsRepository.destroy({
      restartIdentity: true,
      where: { id },
    });
    await this.tasksRepository.destroy({ where: { boardId: id } });
  }
}
