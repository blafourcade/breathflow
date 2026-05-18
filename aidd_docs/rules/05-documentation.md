---
name: documentation
description: Living docs discipline. Every PR updates what it affects.
applies_to: ["**"]
---

# Documentation rules

The following files are **living docs**. Update them in the same PR that affects them:

- `docs/PRD.md` — when scope changes.
- `docs/SPEC.md` — when technical contracts change.
- `docs/BACKLOG.md` — when a story is added, refined, or closed.
- `docs/ARCHITECTURE.md` — when structure changes.
- `docs/DESIGN_SYSTEM.md` — when tokens or components are added.
- `docs/SCREENS.md` — when a screen blueprint changes meaningfully.
- `aidd_docs/memory/` — when long-lived project context shifts.

Add a `docs/adr/NNNN-<slug>.md` for any irreversible structural decision: database engine, auth provider, mobile framework, primary navigation library, payment processor.

PRs that change `apps/api/src/shared/db/schema.ts` must include a generated `drizzle/*.sql` migration in the same commit.
