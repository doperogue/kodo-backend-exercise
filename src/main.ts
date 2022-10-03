import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import {
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Initialize .env file
  dotenv.config();

  const port = process.env.APP_PORT ? process.env.APP_PORT : '3000';

  console.log('Development Server started at port:' + port);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory(errors: ValidationError[]) {
        return new UnprocessableEntityException(
          errors,
          'The given data was invalid.',
        );
      },
    }),
  );

  await app.listen(port);
}

bootstrap();
