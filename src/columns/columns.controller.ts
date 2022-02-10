import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseGuards,
  UseFilters,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { AllExceptionsFilter } from 'src/exception-filters/all-exceptions.filter';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('Columns')
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
@Controller('/boards/:boardId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'column creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateColumnDto })
  @Post()
  async create(
    @Param('boardId', ParseUUIDPipe) _,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    return await this.columnsService.create(createColumnDto);
  }

  @ApiOperation({ summary: 'get all column' })
  @ApiResponse({ status: HttpStatus.OK, type: [CreateColumnDto] })
  @Get()
  async findAll(@Param('boardId', ParseUUIDPipe) _) {
    return await this.columnsService.findAll();
  }

  @ApiOperation({ summary: 'get column by id' })
  @ApiResponse({ status: HttpStatus.OK, type: CreateColumnDto })
  @Get(':columnId')
  async findOne(
    @Param('boardId', ParseUUIDPipe) _,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ) {
    if (await this.columnsService.findOne(columnId)) {
      return await this.columnsService.findOne(columnId);
    } else {
      throw new NotFoundException('Column not found!');
    }
  }

  @ApiOperation({ summary: 'update column by id' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateColumnDto })
  @Put(':columnId')
  async update(
    @Param('boardId', ParseUUIDPipe) _,
    @Param('columnId', ParseUUIDPipe) columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    if (await this.columnsService.findOne(columnId)) {
      return await this.columnsService.update(columnId, updateColumnDto);
    } else {
      throw new NotFoundException('Column not found!');
    }
  }

  @ApiOperation({ summary: 'delete column by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':columnId')
  async remove(
    @Param('boardId', ParseUUIDPipe) _,
    @Param('columnId', ParseUUIDPipe) columnId: string,
  ) {
    if (await this.columnsService.findOne(columnId)) {
      await this.columnsService.remove(columnId);
    } else {
      throw new NotFoundException('Column not found!');
    }
  }
}
