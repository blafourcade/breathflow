# BreathFlow — Technical Spec

## Scope

v1 mobile-first breathwork app, iOS + Android, with companion API and managed Postgres. Web app is out-of-scope (Expo web compatible but not actively shipped).

## High-level architecture

```
┌──────────────┐    https/jwt    ┌──────────────────┐
│ Expo (RN)    │  ─────────────► │ Next.js on Vercel │
│ iOS/Android  │                 │ Fluid Compute     │
└──────┬───────┘                 └────────┬─────────┘
       │                                   │
       │ Clerk JS                          │ Drizzle ORM
       │                                   ▼
       ▼                            ┌────────────┐
┌──────────────┐                    │ Neon       │
│ Clerk        │                    │ Postgres   │
│ identity     │                    └────────────┘
└──────────────┘
```

- **Mobile**: Expo (RN 0.76+), expo-router, Reanimated 3, Skia for animated breathing visuals, expo-haptics, expo-av, expo-keep-awake, Zustand stores, React Query for server state.
- **Backend**: Next.js 15 App Router on Vercel Fluid Compute, Drizzle ORM, Neon Postgres (serverless driver), Clerk middleware.
- **Realtime / push**: Expo Notifications + Vercel cron for daily reminders (deferred).
- **Storage**: Vercel Blob for avatar uploads.
- **CI/CD**: GitHub Actions → Vercel (api) + EAS Build (mobile).

## Domain model

```
User 1—* Session
User 1—* CustomPattern
User 1—* BoltMeasurement
User *—* Friend (self-join, status)
User 1 — 1 StreakState
Clan 1—* ClanMember *—1 User
Pattern *—1 Owner (User, nullable for system presets)
Pattern 1—* SessionSnapshot (denormalised JSON)
```

See `apps/api/src/shared/db/schema.ts` for canonical schema. Migrations generated via `drizzle-kit`.

## API surface (v1)

| Method | Path                          | Auth | Purpose                              |
| ------ | ----------------------------- | ---- | ------------------------------------ |
| GET    | `/api/health`                 | —    | Liveness                             |
| GET    | `/api/sessions`               | yes  | List my recent sessions              |
| POST   | `/api/sessions`               | yes  | Persist a completed session          |
| GET    | `/api/dashboard`              | yes  | Aggregated stats for current user    |
| GET    | `/api/patterns`               | yes  | List own + public patterns           |
| POST   | `/api/patterns`               | yes  | Create a custom pattern              |
| GET    | `/api/bolt`                   | yes  | List BOLT history                    |
| POST   | `/api/bolt`                   | yes  | Record a BOLT measurement            |
| GET    | `/api/friends`                | yes  | List friend edges                    |
| POST   | `/api/friends`                | yes  | Send a friend request                |
| GET    | `/api/clans`                  | —    | List top clans                       |
| POST   | `/api/clans`                  | yes  | Create a clan                        |
| GET    | `/api/leaderboard?period=week`| —    | Global minutes leaderboard           |

All authenticated endpoints accept Bearer Clerk JWT (mobile) or session cookie (web).

## Mobile architecture

- **expo-router** file-system routes drive navigation.
- **Feature-based folders** under `src/features/`. Each feature owns its screens, components, hooks, and stores.
- **Shared kernel** under `src/shared/` for UI primitives, theme provider, API client, fetch wrappers.
- **State**:
  - React Query for server data (cache TTL 5 min, optimistic mutations for session create).
  - Zustand for session-local timer state (so the BreathEngine driver is decoupled from UI).
- **Animations**: Reanimated 3 worklets driven by `react-native-reanimated` SharedValue, synced to `BreathEngine` tick via `runOnJS`.
- **Visuals**: react-native-skia Canvas for breath ring; `react-native-svg` for charts; `expo-linear-gradient` for backgrounds.
- **Offline**:
  - AsyncStorage queue: `pending_sessions[]`.
  - On resume + network online, flush queue with retry-and-backoff.
- **Background audio cues**: expo-av with `staysActiveInBackground: true` for tone cues.

## Backend architecture (clean / hexagonal)

- Each feature has: `domain/` (entities, ports), `application/` (use cases), `infrastructure/` (Drizzle repos), `presentation/` (HTTP handlers + Zod DTOs).
- App-router `route.ts` files only re-export from `presentation/routes.ts`.
- Repositories implement ports (interfaces in `domain/ports.ts`). Use cases never import Drizzle.
- Dependency injection is constructor-style: presentation builds use cases with concrete repos.
- All authenticated handlers funnel through `features/auth/require-user.ts`.

## Cross-cutting

- **Auth**: Clerk middleware protects API; mobile uses `@clerk/clerk-expo` and sends Bearer tokens.
- **Errors**: typed `HttpError` subclasses; `handle()` wrapper centralises JSON error envelopes.
- **Validation**: Zod schemas in each `presentation/dto.ts`. Domain types are not DTOs.
- **Logging**: `console.error` with redaction in `handle()`. Vercel logs available via `vercel logs`.
- **Observability**: Vercel Web Analytics, Sentry (deferred).
- **Env**: validated once via `shared/config/env.ts` (Zod).

## Deployment

| Surface  | Platform     | Trigger                |
| -------- | ------------ | ---------------------- |
| API      | Vercel       | push to `main`         |
| Web (lp) | Vercel       | push to `main`         |
| Mobile   | EAS Build    | tag `mobile-v*`        |
| DB       | Neon         | manual provision once  |

## Testing strategy

- **Unit**: `vitest` on `packages/breath-engine` (pure), each use case, BOLT classifier, streak logic.
- **Integration**: `vitest` + ephemeral pg (Testcontainers) for repositories (deferred to MS-1).
- **Component**: React Native Testing Library for hooks and timer screen reducer.
- **E2E**: Maestro flows — onboarding, run a session, open library, build custom pattern.

## Performance budgets

- Cold start to home: ≤ 2.0 s P75 on a Pixel 6.
- Session start latency: ≤ 200 ms tap-to-first-cue.
- Animation: 60 fps locked (Reanimated UI thread).
- API P95: ≤ 300 ms in EU + US regions.

## Security

- Clerk-managed auth, JWT verification on server.
- No PII in logs.
- Rate limiting via Vercel firewall on `/api/*` (100 req / min / IP).
- All inputs zod-validated.
- Pattern share codes: 8-char alphanumeric (≈ 1 trillion space).
