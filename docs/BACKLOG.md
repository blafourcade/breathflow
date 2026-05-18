# BreathFlow — Backlog

Status legend: `🟢 done` `🟡 in progress` `⚪ todo` `🔵 spike`.

Story IDs are prefixed by epic: `E1.S1`, `E2.S3`, …
Acceptance criteria use *Given / When / Then*.

---

## E1 — Foundations & Tooling

### E1.S1 ⚪ Monorepo bootstrap
- pnpm workspaces, Turborepo, TS strict, ESLint, Prettier.
- **AC**: `pnpm install && pnpm typecheck` passes from a clean clone.

### E1.S2 ⚪ Shared design tokens
- Package `@breathflow/ui` with palette, themes, space, radius, typography, motion, elevation.
- **AC**: imported by both apps; types exported.

### E1.S3 ⚪ Shared API types
- Package `@breathflow/types` reflects domain entities exposed by API.
- **AC**: mobile + api compile against the same types.

### E1.S4 ⚪ CI pipeline
- GitHub Actions: lint, typecheck, test, build per workspace.
- **AC**: failing test blocks merge; coverage reported.

### E1.S5 🔵 Spike: Background-audio cue reliability on iOS
- Validate Expo AV in `staysActiveInBackground` mode for 10+ minutes.
- Output: ADR with chosen approach.

### E1.S6 🔵 Spike: HRV/respiration via Apple Health & Google Fit
- Investigate native modules and consent flow.
- Output: feasibility doc.

---

## E2 — Core Breathing Engine

### E2.S1 ⚪ State machine in pure TS
- BreathEngine with phases inhale/hold_full/exhale/hold_empty.
- **AC**: deterministic ticks; pure-TS unit tests cover full lifecycle, pause/resume, skip, full completion.

### E2.S2 ⚪ Preset catalogue
- 10 curated presets with metadata.
- **AC**: each preset rendered through engine produces expected step count.

### E2.S3 ⚪ Wim-Hof mode
- Hyperventilation rounds → retention with stopwatch → recovery hold.
- **AC**: engine emits dedicated phase events; UI receives `retention` callback.

### E2.S4 ⚪ Custom pattern validation
- Domain rules (rounds 1-200, phase 0-180s for holds, 0-60s for breaths).
- **AC**: invalid params rejected at engine and API layers.

### E2.S5 ⚪ Performance: engine drift < 30ms over 5 min
- Engine uses monotonic clock; per-phase drift measured in test.

---

## E3 — Mobile UX (timer)

### E3.S1 ⚪ Animated breathing circle
- Skia canvas with breathing radius bound to engine SharedValue.
- **AC**: 60 fps locked; ring color shifts per phase; reduced-motion respected.

### E3.S2 ⚪ Phase audio cues
- Voice / tone / silent options; user-configurable.
- **AC**: cues fire within 50 ms of phase boundary.

### E3.S3 ⚪ Haptic cues
- Strong haptic on phase change, light on round transition.
- **AC**: device respects haptic-off setting; nothing on simulator.

### E3.S4 ⚪ Session controls
- Pause, resume, skip phase, end early.
- **AC**: state survives lockscreen; resume continues from last tick.

### E3.S5 ⚪ Keep-awake while running
- expo-keep-awake during active session only.
- **AC**: phone never sleeps during session; reverts after.

### E3.S6 ⚪ Post-session reflection sheet
- Mood + energy 1-5 sliders, free-text notes, save.
- **AC**: writes a Session entity via API.

### E3.S7 ⚪ Wim-Hof retention UI
- Stopwatch during retention with tap-to-end; recovery hold timer.
- **AC**: persists longestHoldSec.

---

## E4 — Library & Custom Patterns

### E4.S1 ⚪ Library screen
- Filterable, browsable list of presets.
- **AC**: filter by category and difficulty.

### E4.S2 ⚪ Pattern detail
- Animated preview ring, science blurb, contraindications, "Start".
- **AC**: contraindication interstitial gates advanced protocols.

### E4.S3 ⚪ Custom pattern builder
- Sliders + live preview + save.
- **AC**: persists to API; surfaces in library under "Mine".

### E4.S4 ⚪ Share a pattern
- Short-code share link `breathflow://p/<code>` and HTTPS deep link.
- **AC**: opening a link imports the pattern.

### E4.S5 ⚪ Pattern visibility
- private / friends / public toggle.
- **AC**: public discovery only shows public patterns; friends require accepted edge.

---

## E5 — Progression & Stats

### E5.S1 ⚪ Streak engine
- Daily streak with current + longest; same-day duplicates do not double-count.
- **AC**: unit-tested transitions (`day+1` increments; `day+2` resets).

### E5.S2 ⚪ Dashboard screen
- Streak, sessions/week, total minutes, sparkline, category donut, BOLT trend.
- **AC**: skeleton on first load < 200ms; full render < 800ms.

### E5.S3 ⚪ Personal records
- Longest hold per protocol, max rounds, longest streak.
- **AC**: surfaces unlock toast when PR is broken.

### E5.S4 ⚪ Export data (CSV)
- Sessions + BOLT + custom patterns as CSV.
- **AC**: file shared via system share-sheet.

---

## E6 — BOLT test

### E6.S1 ⚪ BOLT guided measurement
- Step-by-step screen: sit, exhale, hold, stop at first urge.
- **AC**: stopwatch ms-accurate; saved with notes.

### E6.S2 ⚪ BOLT trend chart
- Line chart with classification bands.
- **AC**: latest score with category and advice.

---

## E7 — Auth & Profile

### E7.S1 ⚪ Sign-up & sign-in (Clerk)
- Apple, Google, email.
- **AC**: Clerk JWT recognised by backend `requireUser`.

### E7.S2 ⚪ Provision user row
- Webhook from Clerk creates row on first sign-in.
- **AC**: post-sign-up, `/api/dashboard` returns 200.

### E7.S3 ⚪ Onboarding carousel
- 4-screen value prop + goal selection + experience level.
- **AC**: writes to profile preferences.

### E7.S4 ⚪ Profile edit
- Display name, username (unique), avatar upload.
- **AC**: username uniqueness enforced (DB + zod).

### E7.S5 ⚪ Account deletion (soft → hard)
- 7-day grace, then cascade.
- **AC**: deletion request emits event; daily cron purges expired requests.

---

## E8 — Social

### E8.S1 ⚪ Friend request / accept / remove
- Pending / accepted / blocked statuses.
- **AC**: mutual visibility once accepted; block hides both ways.

### E8.S2 ⚪ Friends activity feed
- Last 7 days of friends sessions (no PII beyond username + minutes).
- **AC**: respects friend visibility setting.

### E8.S3 ⚪ Create clan
- Name, slug, description, visibility.
- **AC**: creator becomes owner; member count starts at 1.

### E8.S4 ⚪ Join clan
- Open / request / invite paths.
- **AC**: capacity 1000 members; visibility enforced.

### E8.S5 ⚪ Clan feed + leaderboard
- Minutes leaderboard within clan (week / month / all-time).
- **AC**: clan-scoped query.

### E8.S6 ⚪ Global leaderboard
- Minutes practiced (week / month / all-time).
- **AC**: opt-out in privacy settings.

---

## E9 — Notifications

### E9.S1 ⚪ Daily reminder
- User-chosen time, local timezone.
- **AC**: arrives within 5 min of scheduled time; respects DND.

### E9.S2 ⚪ Streak-saver
- Notification if streak risk within 4h of midnight.
- **AC**: not sent if user already practiced today.

### E9.S3 ⚪ Friend / clan notifications
- Friend completes first session of day, clan event posted.
- **AC**: granular toggles in settings.

---

## E10 — Quality, Compliance, Ops

### E10.S1 ⚪ Crash + error monitoring
- Sentry (mobile + api).
- **AC**: source-mapped stack traces in dashboard.

### E10.S2 ⚪ Privacy & terms
- ToS + Privacy + cookie policy linked from sign-up and settings.
- **AC**: GDPR + Apple ATT compliant.

### E10.S3 ⚪ Safety interstitial for advanced protocols
- Hard, full-screen warning before first Wim Hof / Bhastrika session.
- **AC**: shown exactly once per user per protocol; logs acknowledgement.

### E10.S4 ⚪ Rate limiting
- 100 req/min/IP on `/api/*`; per-user mutation 30/min.
- **AC**: 429 response; retry-after header.

### E10.S5 ⚪ Performance SLO
- Cold start ≤ 2s P75; API P95 ≤ 300ms.
- **AC**: dashboard tracks SLI weekly.

### E10.S6 ⚪ App Store + Play readiness
- Screenshots, store listing, metadata, age rating.
- **AC**: TestFlight + Play Internal builds approved.

---

## Cross-cutting / Definition of Done

- TS strict, zero `any`, no warnings.
- Each story ships with: code, tests, doc update (PRD/ARCHITECTURE/ADR as relevant), changelog entry.
- Accessibility: VO/TB labels on every interactive control.
- Localisation-ready (strings in `i18n/en.json`).

---

## Milestones

- **M0 — Bootstrap (week 1)**: E1.S1-S4 + E2.S1-S2 + E5.S1 + E6.S1 + E7.S1-S2.
- **M1 — Solo experience (weeks 2-3)**: full E2, E3, E4, E5, E6, E7.
- **M2 — Social (weeks 4-5)**: E8 + E9.
- **M3 — Launch-ready (week 6)**: E10 + store assets + final QA.
