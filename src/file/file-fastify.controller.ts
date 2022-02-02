import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { FileService } from './file.service';

@Controller('file')
export class FileFastifyController {
  constructor(private fileService: FileService) {}

  @Post()
  @UseGuards(AuthGuard)
  async uploadFile(@Req() req, @Res() res) {
    return await this.fileService.uploadFileFastify(req, res);
  }

  @Get(':fileName')
  async getUploadedFile(@Param('fileName') fileName, @Res() res) {
    try {
      const readStream = await this.fileService.getFileFastify(fileName);
      return res.send(readStream);
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
