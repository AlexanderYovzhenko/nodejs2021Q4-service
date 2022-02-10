import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async uploadFile({ originalname, filename }) {
    const response = {
      originalname,
      filename,
    };
    return response;
  }

  //Fastify
  async getFileFastify(fileName) {
    const readStream = fs.createReadStream(`static/${fileName}`);
    return readStream;
  }
}
