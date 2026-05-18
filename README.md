# BreathFlow

Guided breathwork app for iOS and Android. Custom breath timers (inhale, hold-full, exhale, hold-empty), curated presets (Wim Hof, Box, 4-7-8, Coherent, Pranayama…), progression dashboard, friends, clans, performance tests.

## Stack

- **Mobile**: Expo (React Native) + TypeScript, Reanimated, Skia, Expo Audio, Expo Haptics
- **Backend**: Next.js (App Router) on Vercel, Drizzle ORM, Neon Postgres
- **Auth**: Clerk
- **State**: Zustand, React Query
- **Monorepo**: Turborepo / pnpm workspaces
- **CI**: GitHub Actions
- **Deploy**: Vercel (API) + EAS Build (mobile)

## Structure

```
apps/
  mobile/      Expo app (iOS + Android)
  api/         Next.js API on Vercel
packages/
  breath-engine/  Pure-TS breathing state machine + presets
  ui/             Shared UI primitives / design system tokens
  types/          Shared TS types (API contracts)
docs/            Product, design, research, ADRs
aidd_docs/       Memory bank + rules for AI-driven dev
```

## Run

```bash
pnpm install
pnpm dev            # all
pnpm dev:mobile     # Expo
pnpm dev:api        # Next.js on Vercel
```

## License

MIT
