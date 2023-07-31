import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { SetHeaderInterceptor } from './interceptors/setHeader.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs';
import { resolve } from 'path';
import { stringify } from 'yaml';

const PORT = process.env.PORT;

const config = new DocumentBuilder()
  .setTitle('Home Library Service')
  .setDescription('Home music library service')
  .setVersion('1.0.0')
  .addServer('/api')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiDocument = SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV === 'development') {
    writeDocAPI(stringify(apiDocument));
  }
  SwaggerModule.setup('api', app, apiDocument);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new SetHeaderInterceptor());
  await app.listen(PORT);
}
bootstrap();
const writeDocAPI = (document: string) => {
  const fileURL = resolve(__dirname, '../doc/open-api.yaml');
  writeFile(fileURL, document, { encoding: 'utf8' }, () => {
    console.log(`\x1b[95mAPI docs has been saved to ${fileURL}\x1b[0m`);
  });
};
