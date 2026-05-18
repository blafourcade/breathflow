# CLAUDE.md — BreathFlow project rules

## Architecture (non-negotiable)

- **Feature-based clean architecture** in `apps/api/src/features/<name>/{domain,application,infrastructure,presentation}`.
- **Mobile** mirrors with `apps/mobile/src/features/<name>/{domain,application,presentation}`.
- **Shared kernel** lives only in `packages/` (breath-engine, ui, types). Never duplicate inside an app.
- Use cases receive ports (interfaces) via parameters. Repositories implement ports.
- No `drizzle-orm` or `next/server` import in `domain/` or `application/` directories.

## Code

- TypeScript strict, no `any`, no `unknown` leaks.
- File names kebab-case. Functions camelCase, types PascalCase.
- Tests colocated as `*.test.ts`. Vitest. No mocks for the database — repositories are unit-tested via fakes; integration tests against Testcontainers Postgres.
- Functions target ≤ 40 lines.
- Comments only for the *why*; nothing that restates the *what*.
- All HTTP edges validate with Zod. Domain types are not DTOs.

## Docs

- `docs/PRD.md`, `docs/SPEC.md`, `docs/BACKLOG.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md` are living documents. Update them in the same change that affects them.
- `docs/adr/NNNN-*.md` for any irreversible decision.
- `aidd_docs/memory/` for AI-context memory.

## Safety

- Wim Hof, Bhastrika, advanced Buteyko: gated behind a safety interstitial that surfaces contraindications from `packages/breath-engine` preset metadata. Acknowledgement is persisted per user per protocol.
- Never claim medical benefit. Always include the "not medical advice" line where benefits are listed.

## Git

- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).
- Trunk-based; feature branches squash-merged into `main`.
- PRs reference a backlog story id (`E3.S4`) and an ADR if structural.

## Memory bank

Loaded by `aidd_docs/memory/MEMORY.md`:

<aidd_project_memory>
- internal/01-product.md
- internal/02-architecture.md
- internal/03-conventions.md
- internal/04-research-pointers.md
</aidd_project_memory>
