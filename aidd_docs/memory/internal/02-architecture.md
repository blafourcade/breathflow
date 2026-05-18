---
name: architecture
description: Monorepo layout, clean architecture conventions, tech stack
type: project
---

# Architecture

**Monorepo** (pnpm + Turborepo):

```
apps/mobile   Expo (RN + TS), expo-router, Reanimated, Skia
apps/api      Next.js 15 App Router on Vercel, Drizzle, Clerk
packages/breath-engine   pure-TS state machine + presets + BOLT
packages/ui              design-system tokens
packages/types           shared API contracts
```

**Clean architecture per feature** (`features/<name>/{domain,application,infrastructure,presentation}`):
- `domain/` — entities + ports (interfaces).
- `application/` — use cases, framework-free.
- `infrastructure/` — Drizzle repositories implementing ports.
- `presentation/` — HTTP handlers + Zod DTOs.

Next.js route files only re-export `presentation/routes`.

**Stack**:
- Auth: Clerk.
- DB: Neon Postgres via `@neondatabase/serverless` + Drizzle.
- State (mobile): React Query (server) + Zustand (local).
- Tests: Vitest (unit) + Maestro (e2e mobile).

See `docs/ARCHITECTURE.md` for canonical reference.
