# BreathFlow — Product Requirements Document

## Vision

A mobile breathwork companion (iOS + Android) that makes intentional breathing as habit-forming as fitness tracking, as personalised as a coach, and as social as a fitness app. Users follow guided sessions, build their own protocols, track progression with measurable markers (BOLT, retention time, streaks), and grow with friends and clans.

## Problem

Current breathwork apps (Breathwrk, Othership, Open) lock advanced protocols behind subscriptions, give weak progression metrics, and offer no social or competitive layer. People who want a Wim Hof timer with proper hyperventilation rounds + retention often resort to YouTube videos. People who want to build their own pattern (e.g. 6-3-6-3 for performance) have no first-class tool.

## Goals (12-month outcomes)

| Metric                          | Target           |
| ------------------------------- | ---------------- |
| Day-1 → Day-7 retention         | ≥ 35%            |
| Sessions per active user / week | ≥ 4              |
| Friends-graph density           | ≥ 30% of users have ≥1 friend |
| Mean session completion rate    | ≥ 80%            |
| BOLT-tracked users              | ≥ 25% of WAU     |
| App Store rating (iOS + Android)| ≥ 4.6            |

## Non-goals

- Replacing medical-grade respiration therapy.
- Real-time multi-user breathing rooms (v1).
- Audio courses with paid teacher content (v1).
- HRV streaming over BLE (v1 — research spike planned).

## Target users

1. **The optimiser** (Huberman-listener / biohacker, 25-45). Wants metrics, science, retention training.
2. **The de-stresser** (high-pressure professional, 28-55). Needs calm + sleep, doesn't care about science.
3. **The athlete** (endurance, breathwork-curious, 18-40). Wants CO2 tolerance and performance protocols.
4. **The yogi** (pranayama practitioner, 20-60). Wants proper Nadi Shodhana, Bhastrika, Kapalabhati, Ujjayi.

## Core principles

- **Safety first.** Contraindications are surfaced *before* the user can start dangerous protocols (Wim Hof, Bhastrika). Hard interstitial.
- **Privacy by default.** All custom patterns and sessions are private until the user opts in.
- **Offline first.** Sessions run with no network. Sync is best-effort.
- **Frictionless start.** From cold open to active session: ≤ 3 taps for the last-used pattern.

## Feature set (v1)

### Onboarding & auth
- Sign-up / sign-in via Clerk (Apple, Google, email).
- 4-screen value-prop carousel.
- Goal selection (calm, focus, energy, sleep, performance, pranayama).
- Experience-level question (beginner / intermediate / advanced) — gates advanced protocols.
- Optional BOLT baseline measurement.

### Breath timer (core)
- Visual: animated breathing circle (Skia/Reanimated), color per phase.
- Audio cues: voice ("inhale, hold, exhale, hold"), tone, or silent. User-configurable.
- Haptic cues per phase boundary.
- Live progress: phase label, countdown, round indicator, total elapsed.
- Pause, skip-phase, end-early.
- Keep-awake while active.
- Wim Hof mode: hyperventilation cycles → retention with stopwatch → recovery hold.

### Pattern library
- 10+ curated presets at launch (Box, 4-7-8, Coherent, Triangle, Wim Hof, Bhastrika, Nadi Shodhana, Physiological Sigh, Buteyko, Tactical).
- Each preset shows: parameters, expected duration, benefits, contraindications, source, difficulty.
- Filter by category (calm / focus / energize / sleep / performance / pranayama) and difficulty.

### Custom pattern builder
- Sliders for inhale, hold-full, exhale, hold-empty (0-60s each, 0-180s for holds).
- Rounds 1-200.
- Live preview animation.
- Name, category, description.
- Visibility: private / friends / public.
- Share link via short code.

### Progression dashboard
- Current streak, longest streak.
- Sessions this week, total minutes (all time).
- Last 7 days sparkline.
- Category breakdown donut.
- BOLT trend chart with classification (very low / low / moderate / good / excellent).
- Longest recorded retention.
- Personal records (per-pattern best round count, longest hold).

### BOLT test (Body Oxygen Level Test)
- Step-by-step guided measurement.
- Stopwatch starts on full exhale, ends on first urge to breathe (not max hold).
- Persisted with date and notes.
- Trend chart over time.

### Social
- Friend graph (request, accept, remove).
- Friends activity feed (with mute).
- Clans (group communities — open, request-to-join, invite-only).
- Clan feed, clan leaderboard, clan name + icon + description.
- Global / friends / clan leaderboards by minutes practiced (week / month / all-time).

### Profile & settings
- Display name, username, avatar, bio.
- Default cue style, default sound, haptic on/off.
- Theme (dark / light / system).
- Data export (CSV of sessions, BOLT, custom patterns).
- Account deletion (irreversible, 7-day grace).
- Notifications: streak reminder, friend activity, clan events.

### Notifications
- Daily reminder at chosen time.
- Streak saver (if streak about to break in < 4h).
- Friend completed first session of the day.
- Clan event posted.

## Out-of-scope / future

- Audio courses (paid teacher content).
- BLE HRV streaming.
- Apple Watch / WearOS companion.
- Family plans.
- Sleep stories.
- AI-generated personal coach.

## Constraints

- iOS 16+, Android 9 (API 28)+.
- Offline-first; session data sync optional.
- No tracking SDKs without consent (GDPR + Apple ATT).
- Sessions never collect audio without explicit user action.

## Success criteria (launch)

1. App stores accept both builds (TestFlight + Play internal testing).
2. 50 alpha testers complete ≥ 3 sessions each within 14 days.
3. NPS ≥ +30 from alpha cohort.
4. Crash-free sessions ≥ 99.5%.

## Risks

| Risk | Likelihood | Severity | Mitigation |
| ---- | ---------- | -------- | ---------- |
| User does Wim Hof in water | Low | Catastrophic | Mandatory safety interstitial; visible warning during session |
| Audio cues drift on background | Medium | Medium | Use system scheduler, not JS timer; test on iOS background audio |
| Inaccurate retention timer | Medium | Medium | Use monotonic clock; reconcile on resume |
| Friend abuse / harassment | Medium | High | Per-user block; report endpoint; clan moderation roles |
| App review rejection (health claims) | Medium | High | Plain language; no medical claims; clear "not medical advice" footer |
