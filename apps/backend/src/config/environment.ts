import { isIP } from 'node:net';

export interface BackendEnvironment {
  NODE_ENV: 'development' | 'test' | 'production';
  HOST: string;
  PORT: number;
}

export function validateEnvironment(
  environment: Record<string, unknown>,
): BackendEnvironment {
  const nodeEnvironment = environment['NODE_ENV'] ?? 'development';
  if (
    nodeEnvironment !== 'development' &&
    nodeEnvironment !== 'test' &&
    nodeEnvironment !== 'production'
  ) {
    throw new Error('NODE_ENV must be development, test, or production.');
  }

  const host = environment['HOST'] ?? '127.0.0.1';
  if (typeof host !== 'string' || isIP(host) === 0) {
    throw new Error('HOST must be an IPv4 or IPv6 address.');
  }

  const rawPort = environment['PORT'] ?? '3001';
  if (typeof rawPort !== 'string' || !/^\d+$/.test(rawPort)) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  const port = Number(rawPort);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return { NODE_ENV: nodeEnvironment, HOST: host, PORT: port };
}
