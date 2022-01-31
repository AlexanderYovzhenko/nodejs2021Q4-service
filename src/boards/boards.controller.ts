import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
  NotFoundException,
  HttpStatus,
  UseFilters,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { AllExceptionsFilter } from 'src/exception-filters/all-exceptions.filter';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('Boards')
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
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: 'board creation' })
  @ApiResponse({ status: 201, type: CreateBoardDto })
  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.create(createBoardDto);
  }

  @ApiOperation({ summary: 'get all boards' })
  @ApiResponse({ status: 200, type: [CreateBoardDto] })
  @Get()
  async findAll() {
    return await this.boardsService.findAll();
  }

  @ApiOperation({ summary: 'get board by id' })
  @ApiResponse({ status: 200, type: CreateBoardDto })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    if (await this.boardsService.findOne(id)) {
      return await this.boardsService.findOne(id);
    } else {
      throw new NotFoundException('Board not found!');
    }
  }

  @ApiOperation({ summary: 'update board by id' })
  @ApiResponse({ status: 200, type: UpdateBoardDto })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    if (await this.boardsService.findOne(id)) {
      return await this.boardsService.update(id, updateBoardDto);
    } else {
      throw new NotFoundException('Board not found!');
    }
  }

  @ApiOperation({ summary: 'delete board by id' })
  @ApiResponse({ status: 204 })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    if (await this.boardsService.findOne(id)) {
      await this.boardsService.remove(id);
    } else {
      throw new NotFoundException('Board not found!');
    }
  }
}
