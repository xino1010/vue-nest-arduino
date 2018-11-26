import {NestApplication, NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import {Logger} from '@nestjs/common';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(port, () => {
    Logger.log(`Nest application listening on port ${port}`, NestApplication.name);
  });
}

bootstrap();
