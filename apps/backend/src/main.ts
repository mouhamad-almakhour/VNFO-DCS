import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createApplication } from './app';
import type { BackendEnvironment } from './config/environment';

async function bootstrap(): Promise<void> {
  const app = await createApplication();
  const config = app.get(ConfigService<BackendEnvironment, true>);
  const port = config.get('PORT', { infer: true });
  const host = config.get('HOST', { infer: true });
  await app.listen(port, host);
  Logger.log(`Backend listening at ${await app.getUrl()}/api/v1`, 'Bootstrap');
}

void bootstrap().catch((error: unknown) => {
  Logger.error(
    error instanceof Error ? error.message : 'Backend startup failed.',
    undefined,
    'Bootstrap',
  );
  process.exitCode = 1;
});
