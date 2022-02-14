import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
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
import { editFileName } from './config-name.file';
import { diskStorage } from 'multer';

@ApiTags('File')
@UseFilters(AllExceptionsFilter)
@Controller('file')
export class FileFastifyController {
  constructor(private fileService: FileService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiHeader({
    name: 'header',
    description: 'Authorization Bearer token',
    schema: {
      type: 'string',
      default: 'Bearer token',
    },
  })
  @ApiOperation({ summary: 'file upload' })
  @ApiResponse({ status: HttpStatus.CREATED })
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
  @UseInterceptors(
    FileFastifyInterceptor('file', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    return await this.fileService.uploadFile(file);
  }

  @ApiOperation({ summary: 'get file by name' })
  @ApiResponse({ status: HttpStatus.OK })
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
