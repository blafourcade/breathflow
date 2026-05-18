---
name: typescript
description: TS strict everywhere. No any. No unknown leaks.
applies_to: ["**/*.ts", "**/*.tsx"]
---

# TypeScript rules

- `strict: true` everywhere.
- `noUncheckedIndexedAccess: true`.
- Never write `any`. Use `unknown` and narrow, or model the type properly.
- Never write `as unknown as X` to bypass a type error — refactor instead.
- Domain types are not DTOs. DTOs live in `presentation/dto.ts` (Zod).
- Public functions have explicit return types when they cross a feature boundary.
- Prefer discriminated unions over enums.
- Use `readonly` aggressively on entities.
