import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: { origin: '*', credentials: true },
      rawBody: true,
    },
  );

  await app.listen(4020, '0.0.0.0');
}

void bootstrap();
