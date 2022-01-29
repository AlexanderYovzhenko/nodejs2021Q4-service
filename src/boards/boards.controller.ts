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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@UseGuards(AuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll() {
    return await this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.boardsService.findOne(id)) {
      return await this.boardsService.findOne(id);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Board not found!');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.boardsService.findOne(id)) {
      return await this.boardsService.update(id, updateBoardDto);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Board not found!');
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.boardsService.findOne(id)) {
      await this.boardsService.remove(id);
    } else {
      res.status(HttpStatus.NOT_FOUND).send('Board not found!');
    }
  }
}
