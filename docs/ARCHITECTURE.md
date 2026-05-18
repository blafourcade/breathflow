# BreathFlow — Architecture

## Principles

- **Feature-based modularization**, not technical-layer-first.
- **Clean Architecture**: dependencies point inward — `presentation → application → domain ← infrastructure`. The domain knows nothing about HTTP, Drizzle, or Expo.
- **Hexagonal ports/adapters**: domain talks to **ports** (interfaces); concrete adapters live in `infrastructure/`.
- **SOLID + Clean Code**: small functions, one reason to change, explicit dependencies, named over comments, no dead/duplicated code.
- **Shared kernel** lives under `packages/` (engine, ui tokens, types). Never duplicate it inside apps.
- **TypeScript everywhere**, strict mode, no `any`.
- **Pure domain core**: `packages/breath-engine` is framework-free, pure functions and a deterministic state machine — fully unit-tested.

## Monorepo layout

```
apps/
  mobile/                  Expo (iOS + Android), feature-based
    src/
      features/
        breathing/         timer, session lifecycle
        library/           preset browsing
        builder/           custom-pattern creation
        dashboard/         stats, streaks, charts
        bolt/              performance test
        social/            friends, clans, leaderboard
        profile/           account, settings
        auth/              clerk integration
      shared/
        ui/                shared components built on @breathflow/ui tokens
        hooks/             cross-feature hooks
        api/               http client, react-query setup
        config/            env, constants
      app/                 expo-router file-system routes (thin)

  api/                     Next.js on Vercel, feature-based
    src/
      features/
        sessions/
          domain/          entities, ports, errors
          application/     use cases
          infrastructure/  Drizzle repositories
          presentation/    HTTP handlers, DTOs (zod)
        patterns/
        dashboard/
        bolt/
        friends/
        clans/
        leaderboard/
        auth/              clerk provisioning, requireUser
      shared/
        db/                drizzle client + schema
        http/              json, handle, errors
        config/            env validation
      app/api/             Next route files — thin re-exports of presentation/routes

packages/
  breath-engine/           pure-TS state machine, BOLT, presets
  ui/                      design-system tokens
  types/                   API contracts shared between mobile & api

docs/
  ARCHITECTURE.md          this file
  PRD.md                   product requirements
  SPEC.md                  product spec
  BACKLOG.md               epics, user stories, spikes
  DESIGN_SYSTEM.md         tokens, components, motion
  SCREENS.md               screen blueprints
  RESEARCH/                breathwork science docs
  adr/                     architecture decision records
```

## Each feature folder

```
features/<feature>/
  domain/
    entities.ts         pure types
    ports.ts            interfaces (Repository, ClockPort, …)
    errors.ts           DomainError subclasses
  application/
    <use-case>.ts       one file per use case (createSession, getDashboard, …)
  infrastructure/
    <name>.repository.ts  Drizzle adapter implementing the port
  presentation/
    dto.ts              Zod schemas for request/response
    routes.ts           HTTP handlers (Next route exports)
```

Rules:

- Use cases receive ports via parameters (constructor-style), not import singletons.
- DTOs validate at the edge. Domain types are not the same as DTOs.
- No Drizzle import in `domain/` or `application/`.
- No `next/server` import in `domain/` or `application/`.

## Mobile feature shape

```
features/<feature>/
  domain/                pure types, selectors
  application/           hooks (useXxx), zustand stores, react-query queries/mutations
  presentation/
    screens/             page-level components (called by app/ router)
    components/          feature-scoped components
```

## Naming

- **Files**: kebab-case (`create-session.ts`).
- **Exports**: PascalCase classes/types, camelCase functions, `SCREAMING_SNAKE` constants.
- **Tests**: colocated `*.test.ts`.

## Code-quality bar

- Functions ≤ 40 lines (target).
- Public functions documented with one-line purpose when non-obvious.
- No magic numbers — extract `const`.
- No `any`, no `unknown` leaks. Validate at edges with Zod.
- Errors are explicit types (no thrown strings).
- Side-effect-free domain.

## Documentation discipline

These docs are updated **in the same PR** as code that affects them:

- `BACKLOG.md` — every new story/spike.
- `ARCHITECTURE.md` — every structural change.
- `docs/adr/NNNN-*.md` — every irreversible/decided trade-off.
- `DESIGN_SYSTEM.md` — every token/component addition.
- `aidd_docs/memory/` — long-lived project knowledge.

The CI enforces presence of an ADR entry for changes touching infra/auth/payments paths.
