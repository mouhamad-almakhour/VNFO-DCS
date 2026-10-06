import { Controller, Get } from '@nestjs/common';

interface HealthResponse {
  status: 'ok';
  service: 'vnfo-dcsc-backend';
}

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return { status: 'ok', service: 'vnfo-dcsc-backend' };
  }
}
