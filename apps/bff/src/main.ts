import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = Number(process.env.BFF_PORT ?? 4000);
  await app.listen(port);
  console.log(`BFF http://localhost:${port}/graphql`);
}

void bootstrap();
