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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'fastify-multer';
import { FileService } from './file.service';
import { editFileName } from './config-name.file';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('file')
export class FileExpressController {
  constructor(private fileService: FileService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    return await this.fileService.uploadFileExpress(file);
  }

  @Get(':fileName')
  async getUploadedFile(@Param('fileName') file, @Res() res) {
    try {
      return res.download('./static/' + file);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
