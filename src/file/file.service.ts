import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async uploadFile(file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  //Fastify
  async getFileFastify(filename: string) {
    const readStream = fs.createReadStream(`static/${filename}`);
    try {
      return readStream;
    } catch (err) {
      console.error('Pipeline failed', err);
    }
  }
}
