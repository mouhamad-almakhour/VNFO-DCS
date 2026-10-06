import 'reflect-metadata';
import type { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApplication } from './config/configure-application';

export async function createApplication(
  options: NestApplicationOptions = {},
): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, options);
  configureApplication(app);
  return app;
}
