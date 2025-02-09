import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

require('dotenv').config();

export default async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle('Tech Challenge Monolith API')
    .setDescription('Application for creating and tracking orders.')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.API_PORT || 3000);
}

bootstrap();