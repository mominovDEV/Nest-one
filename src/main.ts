import { ValidationPipe } from '@nestjs/common';
// import { ValidationPipe } from './pipe/validation.pipe';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3030;
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
      .setTitle('Nest-One Project')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NestJS, Postgersql, Sequileze')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server ${PORT}-da ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
