# ADR 0002 — Feature-based clean architecture

## Status

Accepted · 2026-05-18

## Context

A typical Next.js app organises by technical concern (`controllers`, `services`, `models`, `routes`). At scale, this scatters every feature across the tree and produces fragile cross-cutting changes.

## Decision

Each feature owns its full vertical slice:

```
features/<name>/
  domain/         entities, ports (interfaces)
  application/    use cases
  infrastructure/ Drizzle repositories
  presentation/   HTTP handlers + Zod DTOs
```

Hard rules:

- Use cases (`application/`) take ports as parameters. No module-level singletons.
- `domain/` and `application/` import nothing framework-specific (no `drizzle-orm`, `next/server`, `react-native`, `expo*`).
- `app/api/<name>/route.ts` is a one-line re-export of `presentation/routes`.

## Consequences

- Swappable infrastructure: Drizzle → Prisma would touch only `infrastructure/` files.
- Testability: use cases are unit-tested with in-memory port fakes; no Drizzle in tests.
- Onboarding: a new dev finds everything for a feature in one folder.
- Trade-off: more files per feature. The ratio of files to lines goes up, but coupling goes down.

## Alternatives considered

- **Layered architecture** (controllers / services / repositories at the root) — scatters features.
- **Pure DDD with separate bounded contexts and domain events** — overkill for v1; we'll evolve here if the surface grows.
