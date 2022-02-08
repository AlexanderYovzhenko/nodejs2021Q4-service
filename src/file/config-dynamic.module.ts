import { FileExpressController } from './file-express.controller';
import { FileFastifyController } from './file-fastify.controller';

export class ConfigDynamicModule {
  constructor(private USE_FASTIFY) {}
  controllerFile() {
    return this.USE_FASTIFY === 'true'
      ? FileFastifyController
      : FileExpressController;
  }
}

// export function FileUpload() {
//   return applyDecorators(
//     UseInterceptors(
//       (USE_FASTIFY === 'true'
//         ? FileFastifyInterceptor
//         : FileInterceptor)('file', {
//         storage: diskStorage({
//           destination: './static',
//           filename: editFileName,
//         }),
//       }),
//     ),
//   );
// }
