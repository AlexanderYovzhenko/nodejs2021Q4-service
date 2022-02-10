import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnBoard } from './entities/column.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnBoard)
    private columnsRepository: Repository<ColumnBoard>,
  ) {}

  async create(createColumnDto: CreateColumnDto) {
    const column = await this.columnsRepository.save(createColumnDto);
    return column;
  }

  async findAll() {
    const columns = await this.columnsRepository.find();
    return columns;
  }

  async findOne(id: string) {
    const columnOne = await this.columnsRepository.findOne({ where: { id } });
    return columnOne;
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    await this.columnsRepository.update(id, { ...updateColumnDto });
    const columnUpdate = await this.columnsRepository.findOne({
      where: { id },
    });
    return columnUpdate;
  }

  async remove(id: string) {
    await this.columnsRepository.delete(id);
  }
}
