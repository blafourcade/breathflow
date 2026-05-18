---
name: conventions
description: Code style, naming, testing, and doc conventions
type: project
---

# Conventions

- **TypeScript strict everywhere**. `noUncheckedIndexedAccess`, no `any`.
- **File names**: kebab-case.
- **Exports**: PascalCase types/classes, camelCase functions, SCREAMING_SNAKE constants.
- **Tests**: colocated `*.test.ts` next to source. Vitest.
- **Functions**: prefer ≤ 40 lines; one reason to change.
- **Comments**: only when the *why* is non-obvious.
- **Domain types ≠ DTOs**. Validate at edges with Zod.
- **No Drizzle import** in `domain/` or `application/`.
- **No `next/server` import** in `domain/` or `application/`.
- **Use cases** receive ports via parameters, not module-level singletons.
- **ADRs**: any irreversible structural decision gets an entry under `docs/adr/`.
- **Doc updates**: BACKLOG.md / ARCHITECTURE.md / DESIGN_SYSTEM.md updated in the same PR that affects them.

**Safety bar**: advanced protocols (Wim Hof, Bhastrika) are gated behind a full-screen safety interstitial shown on first run per protocol per user. Contraindications surfaced from `packages/breath-engine` preset metadata.
