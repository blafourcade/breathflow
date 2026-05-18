---
name: new-api-feature
description: Scaffold a new feature module in apps/api following the clean-arch layout.
---

# Scaffold a new API feature

## Steps

1. Create `apps/api/src/features/<name>/{domain,application,infrastructure,presentation}/`.
2. `domain/entities.ts` — pure types for the feature.
3. `domain/ports.ts` — repository interfaces.
4. `application/<use-case>.ts` — one file per use case. No Drizzle. No Next. Pure functions.
5. `infrastructure/<x>.repository.ts` — Drizzle adapter implementing the port.
6. `presentation/dto.ts` — Zod schemas.
7. `presentation/routes.ts` — exports `GET`, `POST`, etc. handlers that:
   - call `requireUser()`
   - parse body with the Zod DTO
   - call the use case wired with the concrete repo
   - return the result
8. `app/api/<name>/route.ts` — one-liner: `export { GET, POST } from "@/features/<name>/presentation/routes"; export const runtime = "nodejs";`.
9. Add a unit test for the most important use case with an in-memory fake repo.
10. Update `docs/SPEC.md` API surface table.
11. Run `DATABASE_URL=postgres://stub:stub@localhost:5432/stub pnpm --filter @breathflow/api typecheck`.
