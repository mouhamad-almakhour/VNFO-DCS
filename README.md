# VNFO-DCSC

VNFO-DCSC is an NFV marketplace using dynamically composed smart contracts.
The existing application is being migrated progressively to a NestJS/TypeScript
backend and a Vite/React frontend while preserving its workflows.

## Repository structure

```text
VNFO-DCS/
├── apps/
│   └── backend/       # NestJS application
├── legacy/           # Original application retained during migration
├── README.md
└── .gitignore
```

`apps/frontend`, `packages/contracts`, and CI configuration will be added in their
own feature branches. The applications currently use independent dependencies;
there is no root npm package or root start command.

## Backend development

Use Node.js 22.13 or later within the Node.js 22 release line, and npm.

```bash
cd apps/backend
npm ci
cp .env.example .env
npm run dev
```

The backend listens on `http://127.0.0.1:3001` by default. Its current increment
provides configuration validation, `GET /api/v1/health`, and validated marketplace
route interfaces. Integration-dependent routes currently return `503`;
authentication, cloud/contract execution, and the frontend have separate branches.

See the [backend README](apps/backend/README.md) for configuration, builds, and
tests.

## Original application

The old server, API adapters, browser files, smart contracts, package files, and
deployment configuration are in [legacy](legacy/README.md). Run its commands from
`legacy/`; the legacy port remains `3000`.

Its Compose file, Dockerfile, environment sample, and Makefile moved together so
their relative paths remain grouped with the application. Keep legacy secrets in
`legacy/.env`. The new backend reads only `apps/backend/.env`.

This reorganization preserves the old source; it does not repair its known
startup and integration defects. Remove legacy components after their migrated
workflows have been validated and reviewed.

## Contribution workflow

Use one feature branch for one feature or two closely related changes. Backend
and frontend work have separate branches. Validate each increment, then open a PR
into `master` for review before starting the next increment.
