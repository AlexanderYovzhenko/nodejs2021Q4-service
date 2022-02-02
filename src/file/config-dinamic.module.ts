import { FileExpressController } from './file-express.controller';
import { FileFastifyController } from './file-fastify.controller';

export class ConfigDinamicModule {
  constructor(private USE_FASTIFY) {}
  controllerFile() {
    return this.USE_FASTIFY === 'fastify'
      ? FileFastifyController
      : FileExpressController;
  }
}
