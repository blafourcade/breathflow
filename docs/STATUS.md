# BreathFlow — Status

Last updated: 2026-05-18

## Done

### Documentation
- `docs/PRD.md` — Product Requirements Document (vision, goals, features, success metrics, risks).
- `docs/SPEC.md` — Technical spec (stack, architecture, API surface, testing, performance budgets, security).
- `docs/BACKLOG.md` — 10 epics, 47 user stories, 2 spikes, 4 milestones.
- `docs/ARCHITECTURE.md` — Monorepo layout + clean architecture conventions.
- `docs/DESIGN_SYSTEM.md` — Tokens, components, motion, accessibility, anti-patterns.
- `docs/SCREENS.md` — ASCII wireframes for every screen.
- `docs/DEPLOY.md` — Deployment runbook.
- `docs/breathwork_research.md` — Citation-backed breathwork knowledge base (16 protocols, physiology, performance tests, safety, audio cues, progression metrics).
- `docs/adr/0001-monorepo-and-stack.md`, `docs/adr/0002-feature-based-clean-arch.md`.
- Memory bank in `aidd_docs/memory/`.

### Engineering
- pnpm + Turborepo monorepo.
- `packages/breath-engine` — pure-TS state machine, 10 presets, BOLT classifier. **9/9 tests passing.**
- `packages/ui` — design tokens.
- `packages/types` — shared API contracts.
- `apps/api` — Next.js 15 on Vercel, feature-based clean architecture, 7 features (sessions, patterns, dashboard, bolt, friends, clans, leaderboard) + auth feature. Drizzle ORM + Neon schema. Clerk middleware.
- `apps/mobile` — Expo (RN 0.76, expo-router) shell with: tab bar, Home, Library, Stats (Dashboard), Social, Profile, full Timer (PhaseRing via Skia + Reanimated). React Query + Zustand-ready architecture.
- **All workspaces typecheck cleanly.**

### Process
- GitHub repo: https://github.com/blafourcade/breathflow
- 10 epic issues + 49 story / spike issues with labels (epic, story, spike, infra, frontend, backend, design, safety) and milestones (M0 / M1 / M2 / M3).
- GitHub Actions CI: typecheck + test for every package + app.
- Issue + PR templates.
- aidd rules (clean-arch, ts, testing, safety, docs), agents (breath-engine-guardian, safety-reviewer), and skill stubs (seed-preset, new-api-feature).

### Deployment
- **Backend deployed** to Vercel: `breathflow-bb9regwp9-baptistelafourcade-2353s-projects.vercel.app` (preview).
- Vercel project linked to repo, build configured for the monorepo.

## Required to make the deployed API functional

The preview build succeeds; the routes need these to **respond 200**:

| Action | How |
| ------ | --- |
| Provision Neon Postgres | https://console.neon.tech → copy connection string |
| Set `DATABASE_URL` on Vercel | `vercel env add DATABASE_URL` |
| Set Clerk keys on Vercel | `vercel env add CLERK_SECRET_KEY` + `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` |
| Run migrations | `DATABASE_URL=… pnpm --filter @breathflow/api db:generate && db:migrate` |
| (Optional) disable Vercel SSO on preview | Project Settings → Deployment Protection |
| Promote to production | `vercel deploy --prod` |

## Required to ship a mobile build

EAS Build requires an interactive login the first time:

```bash
npm i -g eas-cli
eas login
cd apps/mobile
eas init
eas build --profile preview --platform all
```

## Open backlog (prioritised)

- **M1 (Solo experience)**: full timer audio + haptic cues (E3.S2/S3), pattern detail sheet (E4.S2), safety interstitial (E10.S3), post-session reflection (E3.S6), onboarding carousel (E7.S3), Clerk sign-in screen (E7.S1), Drizzle migration generation (E1.S4), unit + integration tests for repositories.
- **M2 (Social)**: friends UI, clans UI, leaderboards UI, notifications, share-pattern deep links.
- **M3 (Launch-ready)**: Sentry, rate limiting, store assets, performance SLO tracking, account deletion cascade.

## Known gaps / honest disclosures

1. **Real-device verification** has not been done — mobile compiles and typechecks; the actual `expo start` flow on a simulator was not run in this session.
2. **API endpoints are wired** but no integration tests yet (in-memory unit tests for the streak use case only).
3. **Deployment is preview-only**, behind Vercel auth, and currently lacks env vars to serve dynamic routes.
4. **Mobile EAS Build** has its `eas.json` and `app.json` ready but was not executed (requires interactive auth).
5. **Database migrations** are generated from the schema but not yet applied (no live Neon DB linked).
6. **No screenshots, audio assets, or splash/icon PNGs** were produced — the `app.json` references files that need to be added before a store-ready build.
7. **Clerk webhook** for user provisioning (E7.S2) is not implemented; without it, sign-up succeeds but `requireUser` would 404.

These are explicit follow-ups, not silent omissions.
