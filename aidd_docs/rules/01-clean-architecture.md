---
name: clean-architecture
description: Feature-based clean architecture per app. Domain has no framework imports.
applies_to: ["apps/api/**", "apps/mobile/**"]
---

# Clean architecture

Every feature lives under `features/<name>/`. Backend layout:

```
features/<name>/
  domain/         entities, ports (interfaces), errors
  application/    use cases (pure functions / classes)
  infrastructure/ repositories implementing ports
  presentation/   HTTP handlers + Zod DTOs
```

Mobile layout:

```
features/<name>/
  domain/         pure types, selectors
  application/    hooks, stores, queries/mutations
  presentation/   screens, components
```

## Hard rules

- **No `drizzle-orm` import** in `domain/` or `application/`.
- **No `next/server` import** in `domain/` or `application/`.
- **No `react-native` or `expo*` import** in mobile `domain/`.
- Use cases receive ports via constructor / parameters — never module-level singletons.
- Next route files (`app/api/**/route.ts`) only `export { GET, POST, ... } from "@/features/<name>/presentation/routes"`.

## Why

When you can swap the database or the HTTP framework without touching `application/` and `domain/`, you've kept the domain stable. When you can't, the architecture is leaking.
