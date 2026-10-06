import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { resolve } from 'node:path';
import { ApiExceptionFilter } from './common/api-exception.filter';
import { validateEnvironment } from './config/environment';
import { HealthModule } from './health/health.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(__dirname, '../.env'),
      validate: validateEnvironment,
    }),
    HealthModule,
    MarketplaceModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: ApiExceptionFilter }],
})
export class AppModule {}
