import 'reflect-metadata';
import type { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function createApplication(
  options: NestApplicationOptions = {},
): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, options);
  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();
  return app;
}
