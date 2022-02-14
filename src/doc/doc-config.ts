import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Trello Service')
  .setDescription('Competitor for Trello!')
  .setVersion('1.0.0')
  .addTag('Server nodeJS(nestJS)')
  .build();
