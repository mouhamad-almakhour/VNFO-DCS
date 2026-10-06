# VNFO-DCSC NestJS backend

This is the first backend migration increment. It runs independently of the legacy
Express application and contains configuration validation and a health module.
OpenStack adapters, smart contracts, lifecycle APIs, and the frontend will migrate
in separate feature branches.

The authentication branch will use Better Auth with its SIWE plugin to preserve
wallet-based sign-in. See the [SIWE documentation](https://better-auth.com/docs/plugins/siwe)
and [NestJS integration guide](https://better-auth.com/docs/integrations/nestjs).
Authentication dependencies and routes are not part of this setup increment.

Existing source is kept until its replacement or retirement is validated and
reviewed; repository cleanup comes after migration.

## Setup

Use Node.js 22.13 or later within the Node.js 22 release line, and npm.
From the repository root:

```bash
cd apps/backend
npm ci
cp .env.example .env
npm run dev
```

The `.env` file is optional: the application uses the defaults below when a
variable is absent. Existing process environment variables override `.env` values.
Only `apps/backend/.env` is loaded; the legacy root `.env` is not read.

| Variable | Default | Accepted values |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development`, `test`, `production` |
| `HOST` | `127.0.0.1` | IPv4 or IPv6 address; use `0.0.0.0` in a container |
| `PORT` | `3001` | Integer from `1` to `65535` |

Invalid configuration prevents startup. Port `3001` allows the legacy server to
retain port `3000`. This increment requires no cloud credentials, blockchain RPC,
wallet, or database.

## Health endpoint

```bash
curl http://127.0.0.1:3001/api/v1/health
```

Expected HTTP `200` response:

```json
{"status":"ok","service":"vnfo-dcsc-backend"}
```

This is a process liveness check. It does not assert OpenStack, blockchain, or
database readiness.

## Commands

Run these inside `apps/backend`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Compile and restart on source changes |
| `npm run build` | Compile application sources to `dist` |
| `npm start` | Run the compiled application; build first |
| `npm run typecheck` | Check application and test TypeScript without emitting files |
| `npm test` | Run configuration and HTTP integration tests |
| `npm run test:watch` | Run tests in watch mode |

For a compiled startup:

```bash
npm run build
npm start
```

## Structure

```text
src/
  main.ts                  # Listener and startup error reporting
  app.ts                   # Shared application factory and API prefix
  app.module.ts            # Root module and environment loading
  config/environment.ts    # Typed configuration validation
  health/                  # Health module and controller
test/                      # Configuration and HTTP integration tests
```

Strict TypeScript checks include unchecked index access and exact optional
properties. Application builds exclude tests; typechecking includes them. Jest
uses the same compiler configuration. Dependencies and their lockfile are local to
this package so installing the backend does not require the legacy dependency tree.

The existing root `npm start`, server, routes, contracts, browser files, and Docker
entrypoint remain the legacy application. This scaffold does not repair its known
startup or integration problems. The next backend branch will migrate API routes.
