import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import stream = require('stream');
import * as util from 'util';

@Injectable()
export class FileService {
  //Fastify
  async uploadFileFastify(req, res) {
    const mp = await req.multipart(this.handler, onEnd);
    mp.on('field', function (key, value) {
      console.log('form-data', key, value);
    });

    async function onEnd(err: unknown) {
      if (err) {
        res.send(
          new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
        return;
      }
      res.code(HttpStatus.OK).send('Data uploaded successfully');
    }
  }

  async handler(
    field: string,
    file,
    filename: string,
    encoding: string,
    mimetype: string,
  ): Promise<void> {
    const pipeline = util.promisify(stream.pipeline);
    const writeStream = fs.createWriteStream(`static/${filename}`);
    try {
      await pipeline(file, writeStream);
    } catch (err) {
      console.error('Pipeline failed', err);
    }
  }

  async getFileFastify(filename: string) {
    const readStream = fs.createReadStream(`static/${filename}`);
    try {
      return readStream;
    } catch (err) {
      console.error('Pipeline failed', err);
    }
  }

  //Express
  async uploadFileExpress(file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }
}
