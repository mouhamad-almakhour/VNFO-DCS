# Backend API

All routes use `/api/v1`. This increment defines the HTTP interface and validation
for the existing marketplace capabilities. The production marketplace gateway is
deliberately unavailable: valid integration-dependent requests return HTTP `503`
until authenticated orchestration and its adapters are connected. The health
endpoint remains available and does not test external services.

## Routes

| Method | Path relative to `/api/v1` | Purpose | Success status when implemented |
| --- | --- | --- | --- |
| `GET` | `/health` | Process liveness | `200` |
| `GET` | `/resources` | Available provider resources | `200` |
| `POST` | `/quotes` | Quote a resource request | `200` |
| `GET` | `/vnfs` | Current user's VNFs | `200` |
| `GET` | `/vnfs/:vnfId` | VNF details | `200` |
| `POST` | `/vnfs` | Prepare VNF creation | `202` |
| `POST` | `/vnfs/:vnfId/resize` | Prepare a resource increase | `202` |
| `DELETE` | `/vnfs/:vnfId` | Prepare termination | `202` |
| `GET` | `/events` | Lifecycle history | `200` |
| `GET` | `/openstack/version` | Sanitized cloud API versions | `200` |

VNF path identifiers are logical VNF UUIDs (version 4). Cloud IDs are separate
fields in VNF details. Legacy route names are not aliases under the new prefix.

## Resource requests

Quotes, creation, and resizing use this JSON body:

```json
{
  "cpuCores": 2,
  "memoryMiB": 512,
  "storageGiB": 10
}
```

All fields are required positive safe integers. Numeric strings, fractions,
unknown fields, and legacy field names such as `cpu` are rejected with HTTP `400`.
Actual capacity checks belong to the connected orchestration implementation.

For resizing, values are **additional resources**, not new totals. The integration
must derive totals from the existing VNF and preserve the old resource mapping
until the replacement is ready. This branch does not execute that workflow.

Wei values in response contracts are decimal strings; do not convert them into
JavaScript floating-point numbers.

## Event queries

`GET /events` accepts:

| Parameter | Default | Validation |
| --- | --- | --- |
| `source` | `all` | `all`, `openstack`, or `blockchain` |
| `limit` | `25` | Integer from `1` to `100` |
| `cursor` | Absent | Nonempty string, maximum 256 characters |

The response contract contains `items` and a nullable `nextCursor`. Events contain
an ID, source, type, nullable logical VNF ID, and occurrence time. Pagination is
defined at this HTTP boundary; durable storage and indexing are later increments.

## Prepared lifecycle operations

The lifecycle response contract contains `operationId`, status
`awaiting-signature`, and an unsigned `transactionRequest` with `chainId`, `to`,
`data`, and `valueWei`. An HTTP `202` response indicates a prepared request that
still needs a wallet transaction. It does not mean infrastructure exists or has
been resized or deleted. The operation manager and contract bridge will implement
this contract in later branches; production currently returns `503`.

## Error format

Validation, unknown routes, unavailable integrations, and application exceptions
use the same envelope:

```json
{
  "statusCode": 503,
  "error": "SERVICE_UNAVAILABLE",
  "message": ["Marketplace integrations are not connected yet."],
  "path": "/api/v1/vnfs"
}
```

The path omits the query string. `message` is always an array of strings. Unexpected
server exceptions and upstream failure bodies are not returned to clients.

## Mapping from the original HTTP API

| Original endpoint | New disposition |
| --- | --- |
| `GET /api/token` | Internal OpenStack authentication only; public token retrieval is retired |
| `POST /api/metamaskid` | Better Auth SIWE session flow in its own branch |
| `GET /api/apiversion` | `GET /api/v1/openstack/version` |
| `GET /api/fetchres` | `GET /api/v1/resources` |
| `GET /api/fetchvnf` | `GET /api/v1/vnfs` and details query |
| `GET /api/events`, `/api/openstackevents`, `/api/blockchainevents` | `GET /api/v1/events`, filtered by source |
| `POST /api/createvnf` | `POST /api/v1/vnfs` |
| `POST /api/scalevnf` | `POST /api/v1/vnfs/:vnfId/resize` |
| `POST /api/deletevnf` | `DELETE /api/v1/vnfs/:vnfId` |

Resource quotation previously happened through a browser contract transaction;
the new HTTP interface makes the quote capability explicit. Registration and
unregistration still require the separately migrated contract and wallet flows.
The original source stays in `legacy/` as the migration reference.

## Integration boundary

Controllers validate HTTP input and call `MarketplaceService`, which delegates
to the typed `MarketplaceGateway`. The default implementation performs no
network calls and returns `503`; HTTP tests override it through Nest dependency
injection to verify successful response contracts and delegation.

Before enabling a real gateway, implement Better Auth sessions, owner-scoped
authorization, request verification, and lifecycle recovery. Derive identity from
the verified session, never a body-supplied wallet or cloud ID. Keep raw Keystone
tokens and upstream responses internal. Add operation-status reads alongside the
durable operation manager, and test actual cloud and blockchain side effects in
their integration branches.
