---
name: testing
description: What we test, how, and where.
applies_to: ["**/*.test.ts", "**/*.test.tsx"]
---

# Testing rules

- **Unit tests live next to source** as `*.test.ts`.
- **Vitest** for both `packages/*` and `apps/api`.
- **No database mocks**. Repositories are unit-tested via in-memory fakes implementing the port. Integration tests run against Testcontainers Postgres.
- **No mocks of internal modules**. If you reach for `vi.mock`, refactor the dependency to a port and pass a fake.
- **Pure domain code first**: every use case has at least one happy-path and one edge-case test.
- **State machines (breath engine)** are tested with a mock clock, never with `await sleep()`.
- **Mobile**: React Native Testing Library for hooks and lightweight presentation; Maestro for end-to-end flows on a simulator.

Test names: `it("does X when Y")`.
