import { validateEnvironment } from '../src/config/environment';

describe('backend environment validation', () => {
  it('uses development defaults without external services', () => {
    expect(validateEnvironment({})).toEqual({
      NODE_ENV: 'development',
      HOST: '127.0.0.1',
      PORT: 3001,
    });
  });

  it('accepts a configured production listener', () => {
    expect(
      validateEnvironment({ NODE_ENV: 'production', HOST: '0.0.0.0', PORT: '8080' }),
    ).toEqual({ NODE_ENV: 'production', HOST: '0.0.0.0', PORT: 8080 });
  });

  it('accepts an IPv6 listener', () => {
    expect(validateEnvironment({ HOST: '::1' }).HOST).toBe('::1');
  });

  it.each(['1', '65535'])('accepts valid port boundary %s', (port) => {
    expect(validateEnvironment({ PORT: port }).PORT).toBe(Number(port));
  });

  it.each(['', '0', '-1', '65536', '3001.5', '3e3', '3001x', ' 3001 ', 'Infinity'])(
    'rejects invalid port %j',
    (port) => {
      expect(() => validateEnvironment({ PORT: port })).toThrow('PORT must be');
    },
  );

  it('rejects unknown environments', () => {
    expect(() => validateEnvironment({ NODE_ENV: 'staging' })).toThrow('NODE_ENV must be');
  });

  it.each(['', 'not-an-address'])('rejects invalid host %j', (host) => {
    expect(() => validateEnvironment({ HOST: host })).toThrow('HOST must be');
  });
});
