import type { INestApplication } from '@nestjs/common';
import type { Server } from 'node:http';
import request from 'supertest';
import { createApplication } from '../src/app';

describe('backend HTTP application', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    app = await createApplication({ logger: false, abortOnError: false });
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('serves the versioned health endpoint without cloud or blockchain access', async () => {
    await request(server)
      .get('/api/v1/health')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ status: 'ok', service: 'vnfo-dcsc-backend' });
  });

  it('does not mount legacy lifecycle routes', async () => {
    await request(server).post('/api/createvnf').expect(404);
  });
});
