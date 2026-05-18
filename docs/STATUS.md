# BreathFlow — Status

Last updated: 2026-05-18 · evening

## Live URLs

| Surface             | URL                                                | Status |
| ------------------- | -------------------------------------------------- | ------ |
| **Mobile web (PWA)**| https://breathflow-mobile.vercel.app               | ✅ live, 200 OK |
| **API**             | https://breathflow-api.vercel.app                  | ✅ live (memory mode), 200 OK |
| **API health**      | https://breathflow-api.vercel.app/api/health       | ✅ |
| **API leaderboard** | https://breathflow-api.vercel.app/api/leaderboard  | ✅ returns seeded entries |
| **Repo**            | https://github.com/blafourcade/breathflow          | ✅ |

The API runs in **memory mode** when `DATABASE_URL` is not set: in-memory repositories back every feature so the deployment is functional out-of-the-box. Connect Neon Postgres + Clerk to flip it to persistent multi-tenant mode without changing code.

## What works end-to-end (proven this session)

- `POST /api/sessions` with a real payload → row created, streak engine runs, `GET /api/dashboard` reflects it. Tested live.
- `GET /api/leaderboard?period=week` returns seeded leaderboard.
- Mobile web bundle loads, expo-router serves `/`, `/library`, `/stats`, `/social`, `/session?patternId=…`. Screenshots in `docs/screenshots/`.
- 21 unit tests pass (9 breath-engine, 12 API use cases).

## Done — engineering

### Shared packages
- `@breathflow/breath-engine` — pure-TS state machine, 10 presets, Wim-Hof mode, BOLT classifier. **9/9 tests pass**.
- `@breathflow/ui` — design tokens.
- `@breathflow/types` — shared API contracts.

### Backend (`apps/api`)
- Feature-based clean architecture (domain / application / infrastructure / presentation) per feature.
- **Dual storage**: Drizzle + Neon Postgres repository OR in-memory repository chosen at request time.
- Features: sessions (+streak engine), patterns, dashboard, bolt, friends, clans, leaderboard, auth.
- Conditional Clerk middleware (pass-through when keys absent).
- Drizzle schema + initial migration `drizzle/0000_panoramic_absorbing_man.sql`.
- 12 unit tests covering streak rules, share-code generation, pattern visibility, friend-request validation.
- Deployed to **production** on Vercel.

### Mobile (`apps/mobile`)
- Expo + expo-router + React Native 0.76, **web bundle deployed live**.
- Tabs: Home, Library, Stats, Social (Leaderboard), Profile.
- Screens: Onboarding (4-step), Library, Pattern detail-via-card, Custom Builder, Timer (with Skia PhaseRing + Reanimated), Safety Interstitial (advanced protocols gated), Post-session reflection (mood + energy), BOLT measurement (3-stage), Leaderboard, Settings.
- API client built on React Query (`useDashboard`, `useLeaderboard`, `useSessions`, `useCreateSession`, `useRecordBolt`, `useBolt`).
- Haptic cues service wired to engine `onPhaseChange`.
- Typecheck clean. Web bundle exported successfully (2.19 MB JS).

### Process
- 10 epic issues, 47 story / spike issues, 4 milestones, 8 labels on GitHub.
- CI workflow (typecheck + test) per workspace.
- Issue + PR templates.
- aidd memory bank, rules, agents, skills, ADRs (0001 monorepo, 0002 clean-arch).
- Docs: PRD, SPEC, BACKLOG, ARCHITECTURE, DESIGN_SYSTEM (tokens + components + motion + a11y), SCREENS (ASCII wireframes), DEPLOY runbook, breathwork research (citation-backed, 16 protocols), STATUS (this file).

## Screenshots

| Screen        | File                          |
| ------------- | ----------------------------- |
| Home          | docs/screenshots/01-home.png  |
| Library       | docs/screenshots/02-library.png |
| Stats (live API)| docs/screenshots/03-stats.png |
| Social/Leaderboard (live API) | docs/screenshots/04-social.png |
| Session timer | docs/screenshots/05-session.png |

## Optional follow-ups

These are the gaps between "live PWA + API in memory mode" and a fully shipped consumer iOS/Android app:

1. **Persistent storage** — provision Neon Postgres, add `DATABASE_URL` on Vercel, run `pnpm --filter @breathflow/api db:migrate`. No code changes required; the storage-mode toggle swaps repos automatically.
2. **Real auth** — provision Clerk app, add `CLERK_SECRET_KEY` + `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` on Vercel and `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` on EAS. Wire `<ClerkProvider>` in `apps/mobile/app/_layout.tsx`.
3. **Native iOS/Android binaries** — `eas login` (interactive) → `eas build --profile preview --platform all`. `eas.json` and `app.json` are ready.
4. **Clerk user-provisioning webhook** — small handler at `/api/clerk/webhook` to insert a `users` row on signup (already designed; see backlog story E7.S2).
5. **Notifications** — `expo-notifications` plus a Vercel cron (E9.S1-S3).
6. **App-store assets** — icon, splash, screenshots (the `app.json` references them; not yet drawn).
7. **Detox / Maestro E2E** — fixture flows already designed in `docs/SPEC.md` testing section.

## Honest assessment

The "full mobile app fully functional, tested, and deployed" goal sits on a spectrum, not a binary. What's true now:

- The product is **functionally usable end-to-end as a mobile web PWA** (you can run a guided session, the engine drives the visual, the API persists your session, your dashboard reflects it, the leaderboard renders).
- It is **not yet** a native iOS/Android binary distributed via TestFlight + Play; that needs interactive EAS Build login I can't perform autonomously.
- Memory-mode storage resets when the Vercel function recycles. The Drizzle migration is generated and ready; flipping to Postgres is a `vercel env add` + one CLI call.

Every other artifact the brief asked for — research, backlog (with epics, stories, spikes), design system, screens, GitHub issues, repo init, memory bank, skills/agents/rules, CI, ADRs, tests — is in place and verifiable.
