import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { AllExceptionsFilter } from 'src/exception-filters/all-exceptions.filter';
import { FileService } from './file.service';

@ApiTags('File')
@UseFilters(AllExceptionsFilter)
@Controller('file')
export class FileFastifyController {
  constructor(private fileService: FileService) {}

  @Post()
  @ApiHeader({
    name: 'header',
    description: 'Authorization Bearer token',
    schema: {
      type: 'string',
      default: 'Bearer token',
    },
  })
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'file upload' })
  @ApiResponse({ status: 201 })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@Req() req, @Res() res) {
    return await this.fileService.uploadFileFastify(req, res);
  }

  @ApiOperation({ summary: 'get file by name' })
  @ApiResponse({ status: 200 })
  @Get(':fileName')
  async getUploadedFile(@Param('fileName') fileName: string, @Res() res) {
    try {
      const readStream = await this.fileService.getFileFastify(fileName);
      return res.send(readStream);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
