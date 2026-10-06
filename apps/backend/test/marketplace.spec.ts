import { BadGatewayException, NotFoundException } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { Server } from 'node:http';
import request from 'supertest';
import { createApplication } from '../src/app';
import { AppModule } from '../src/app.module';
import { configureApplication } from '../src/config/configure-application';
import { MarketplaceGateway } from '../src/marketplace/marketplace.gateway';
import type { ApiErrorResponse } from '../src/common/api-exception.filter';
import type { PreparedOperation, Resources, VnfDetails } from '../src/marketplace/marketplace.types';

const vnfId = 'a295e0d6-706b-45c5-89c3-97312ca65fe0';
const resources: Resources = { cpuCores: 2, memoryMiB: 512, storageGiB: 10 };
const operation: PreparedOperation = {
  operationId: '85d3110a-d379-47ee-8779-bf1c928dbcc7',
  status: 'awaiting-signature',
  transactionRequest: {
    chainId: 31337,
    to: '0x0000000000000000000000000000000000000001',
    data: '0x',
    valueWei: '2620000000000000000',
  },
};

describe('marketplace routes with production gateway', () => {
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

  it.each([
    ['get', '/api/v1/resources'],
    ['post', '/api/v1/quotes'],
    ['get', '/api/v1/vnfs'],
    ['get', `/api/v1/vnfs/${vnfId}`],
    ['post', '/api/v1/vnfs'],
    ['post', `/api/v1/vnfs/${vnfId}/resize`],
    ['delete', `/api/v1/vnfs/${vnfId}`],
    ['get', '/api/v1/events'],
    ['get', '/api/v1/openstack/version'],
  ] as const)('returns explicit 503 for %s %s without integrations', async (method, path) => {
    const agent = request(server);
    const call = method === 'get' ? agent.get(path)
      : method === 'post' ? agent.post(path).send(resources)
      : agent.delete(path);
    await call.expect(503).expect({
      statusCode: 503,
      error: 'SERVICE_UNAVAILABLE',
      message: ['Marketplace integrations are not connected yet.'],
      path,
    });
  });

  it('keeps health available while integrations are unavailable', async () => {
    await request(server).get('/api/v1/health').expect(200);
  });

  it.each(['token', 'apiversion', 'fetchres', 'fetchvnf', 'openstackevents', 'blockchainevents'])(
    'does not publish the old %s endpoint under the new prefix', async (route) => {
      await request(server).get(`/api/v1/${route}`).expect(404);
    },
  );

  it.each(['metamaskid', 'createvnf', 'scalevnf', 'deletevnf'])(
    'does not publish the old %s mutation', async (route) => {
      await request(server).post(`/api/v1/${route}`).send(resources).expect(404);
    },
  );
});

describe('validated marketplace routes with a test gateway', () => {
  let app: INestApplication;
  let server: Server;
  const gateway: jest.Mocked<MarketplaceGateway> = {
    getResources: jest.fn(),
    quote: jest.fn(),
    listVnfs: jest.fn(),
    getVnf: jest.fn(),
    prepareCreate: jest.fn(),
    prepareResize: jest.fn(),
    prepareTerminate: jest.fn(),
    getEvents: jest.fn(),
    getCloudVersion: jest.fn(),
  };
  const vnf: VnfDetails = {
    vnfId,
    resources,
    status: 'active',
    cloudVnfId: vnfId,
    cloudVnfdId: '728b87ad-9094-4d54-9469-1e1f6b7f4495',
    contractAddress: '0x0000000000000000000000000000000000000001',
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(MarketplaceGateway)
      .useValue(gateway)
      .compile();
    app = module.createNestApplication({ logger: false });
    configureApplication(app);
    await app.init();
    server = app.getHttpServer();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    gateway.getResources.mockResolvedValue({ available: resources });
    gateway.quote.mockResolvedValue({ resources, available: true, amountWei: '2620000000000000000' });
    gateway.listVnfs.mockResolvedValue([vnf]);
    gateway.getVnf.mockResolvedValue(vnf);
    gateway.prepareCreate.mockResolvedValue(operation);
    gateway.prepareResize.mockResolvedValue(operation);
    gateway.prepareTerminate.mockResolvedValue(operation);
    gateway.getEvents.mockResolvedValue({ items: [], nextCursor: null });
    gateway.getCloudVersion.mockResolvedValue({ versions: ['2.0'] });
  });

  afterAll(async () => {
    await app?.close();
  });

  it('reads capacity through the service interface', async () => {
    await request(server).get('/api/v1/resources').expect(200).expect({ available: resources });
    expect(gateway.getResources).toHaveBeenCalledTimes(1);
  });

  it('quotes explicit resource units and preserves integer Wei as a string', async () => {
    await request(server).post('/api/v1/quotes').send(resources).expect(200)
      .expect({ resources, available: true, amountWei: '2620000000000000000' });
    expect(gateway.quote).toHaveBeenCalledWith(resources);
  });

  it('lists VNF details with plain cloud ID strings', async () => {
    await request(server).get('/api/v1/vnfs').expect(200).expect([vnf]);
  });

  it('reads a VNF by its validated UUID', async () => {
    await request(server).get(`/api/v1/vnfs/${vnfId}`).expect(200).expect(vnf);
    expect(gateway.getVnf).toHaveBeenCalledWith(vnfId);
  });

  it('prepares creation and reports awaiting-signature, not cloud readiness', async () => {
    await request(server).post('/api/v1/vnfs').send(resources).expect(202).expect(operation);
    expect(gateway.prepareCreate).toHaveBeenCalledWith(resources);
  });

  it('passes additional resources to resize without changing their units or order', async () => {
    await request(server).post(`/api/v1/vnfs/${vnfId}/resize`).send(resources)
      .expect(202).expect(operation);
    expect(gateway.prepareResize).toHaveBeenCalledWith(vnfId, resources);
  });

  it('prepares termination for the VNF in the path', async () => {
    await request(server).delete(`/api/v1/vnfs/${vnfId}`).expect(202).expect(operation);
    expect(gateway.prepareTerminate).toHaveBeenCalledWith(vnfId);
  });

  it('uses default event pagination', async () => {
    await request(server).get('/api/v1/events').expect(200).expect({ items: [], nextCursor: null });
    expect(gateway.getEvents).toHaveBeenCalledWith({ source: 'all', limit: 25 });
  });

  it('converts only the explicit numeric query and passes source and cursor', async () => {
    await request(server).get('/api/v1/events?source=blockchain&limit=10&cursor=next-page').expect(200);
    expect(gateway.getEvents).toHaveBeenCalledWith({ source: 'blockchain', limit: 10, cursor: 'next-page' });
  });

  it('returns sanitized cloud version information', async () => {
    await request(server).get('/api/v1/openstack/version').expect(200).expect({ versions: ['2.0'] });
  });

  it.each([
    {},
    { ...resources, cpuCores: 0 },
    { ...resources, memoryMiB: -1 },
    { ...resources, storageGiB: 1.5 },
    { ...resources, cpuCores: '2' },
    { ...resources, memoryMiB: null },
    { ...resources, storageGiB: true },
    { ...resources, cpuCores: Number.MAX_SAFE_INTEGER + 1 },
    { ...resources, account: 'untrusted-wallet' },
    { cpu: 2, memory: 512, storage: 10 },
    [],
  ])('rejects invalid creation payload %j before reaching the gateway', async (body) => {
    const response = await request(server).post('/api/v1/vnfs').send(body).expect(400);
    const error: ApiErrorResponse = response.body;
    expect(error.statusCode).toBe(400);
    expect(error.error).toBe('BAD_REQUEST');
    expect(error.message.length).toBeGreaterThan(0);
    expect(error.path).toBe('/api/v1/vnfs');
    expect(gateway.prepareCreate).not.toHaveBeenCalled();
  });

  it('applies the same validation to quotes and resizing', async () => {
    await request(server).post('/api/v1/quotes').send({ ...resources, cpuCores: 0 }).expect(400);
    await request(server).post(`/api/v1/vnfs/${vnfId}/resize`)
      .send({ ...resources, memoryMiB: '512' }).expect(400);
    expect(gateway.quote).not.toHaveBeenCalled();
    expect(gateway.prepareResize).not.toHaveBeenCalled();
  });

  it('rejects malformed JSON with the same error envelope', async () => {
    const response = await request(server).post('/api/v1/vnfs')
      .set('Content-Type', 'application/json').send('{"cpuCores":').expect(400);
    expect(response.body).toMatchObject({ statusCode: 400, error: 'BAD_REQUEST', path: '/api/v1/vnfs' });
    expect(gateway.prepareCreate).not.toHaveBeenCalled();
  });

  it('validates UUIDs for reads, resize, and termination', async () => {
    await request(server).get('/api/v1/vnfs/not-a-uuid').expect(400);
    await request(server).post('/api/v1/vnfs/not-a-uuid/resize').send(resources).expect(400);
    await request(server).delete('/api/v1/vnfs/not-a-uuid').expect(400);
    expect(gateway.getVnf).not.toHaveBeenCalled();
    expect(gateway.prepareResize).not.toHaveBeenCalled();
    expect(gateway.prepareTerminate).not.toHaveBeenCalled();
  });

  it.each(['source=other', 'limit=0', 'limit=101', 'limit=2.5', 'limit=abc', 'cursor=', 'account=untrusted'])(
    'rejects invalid event query %s', async (query) => {
      const response = await request(server).get(`/api/v1/events?${query}`).expect(400);
      expect(response.body.path).toBe('/api/v1/events');
      expect(gateway.getEvents).not.toHaveBeenCalled();
    },
  );

  it('propagates a missing VNF with a consistent 404', async () => {
    gateway.getVnf.mockRejectedValue(new NotFoundException('VNF not found.'));
    await request(server).get(`/api/v1/vnfs/${vnfId}`).expect(404).expect({
      statusCode: 404,
      error: 'NOT_FOUND',
      message: ['VNF not found.'],
      path: `/api/v1/vnfs/${vnfId}`,
    });
  });

  it('hides unexpected server error details', async () => {
    gateway.prepareCreate.mockRejectedValue(new Error('private credential or upstream body'));
    await request(server).post('/api/v1/vnfs').send(resources).expect(500).expect({
      statusCode: 500,
      error: 'INTERNAL_SERVER_ERROR',
      message: ['Internal server error'],
      path: '/api/v1/vnfs',
    });
  });

  it('preserves upstream failure status without exposing upstream bodies', async () => {
    gateway.getCloudVersion.mockRejectedValue(new BadGatewayException('private upstream token'));
    await request(server).get('/api/v1/openstack/version').expect(502).expect({
      statusCode: 502,
      error: 'BAD_GATEWAY',
      message: ['Internal server error'],
      path: '/api/v1/openstack/version',
    });
  });
});
