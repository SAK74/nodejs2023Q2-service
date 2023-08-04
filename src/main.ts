import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { SetHeaderInterceptor } from './interceptors/setHeader.interceptor';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFileSync, writeFile } from 'fs';
import { resolve } from 'path';
import { parse, stringify } from 'yaml';

const PORT = process.env.PORT;
const apiFileURL = resolve(__dirname, '../doc/open-api.yaml');

const config = new DocumentBuilder()
  .setTitle('Home Library Service')
  .setDescription('Home music library service')
  .setVersion('1.0.0')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let apiDocument: OpenAPIObject;
  if (process.env.NODE_ENV === 'development') {
    apiDocument = SwaggerModule.createDocument(app, config);
    writeDocAPI(stringify(apiDocument));
  } else {
    const data = readFileSync(apiFileURL, { encoding: 'utf8' });
    apiDocument = parse(data);
  }
  SwaggerModule.setup('docs', app, apiDocument);
  console.log('\x1b[95mDocs have building in /docs path\x1b[0m');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new SetHeaderInterceptor());
  await app.listen(PORT, () => {
    console.log(`\x1b[96mServer started in PORT ${PORT}\x1b[0m`);
  });
}
bootstrap();
const writeDocAPI = (document: string) => {
  writeFile(apiFileURL, document, { encoding: 'utf8' }, () => {
    console.log(`\x1b[95mAPI docs has been saved to ${apiFileURL}\x1b[0m`);
  });
};
