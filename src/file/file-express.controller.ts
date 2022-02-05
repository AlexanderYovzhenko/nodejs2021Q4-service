import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
  NotFoundException,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { editFileName } from './config-name.file';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/exception-filters/all-exceptions.filter';

@ApiTags('File')
@UseFilters(AllExceptionsFilter)
@Controller('file')
export class FileExpressController {
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
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
  async uploadedFile(@UploadedFile() file) {
    return await this.fileService.uploadFile(file);
  }

  @ApiOperation({ summary: 'get file by name' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get(':fileName')
  async getUploadedFile(@Param('fileName') fileName: string, @Res() res) {
    try {
      return res.download('./static/' + fileName);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
