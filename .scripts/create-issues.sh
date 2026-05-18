#!/usr/bin/env bash
# Mass-create GitHub issues from BACKLOG.md. Idempotent-ish: only creates if no issue with the same title exists.
set -euo pipefail

REPO="blafourcade/breathflow"

issue() {
  local title="$1"
  local body="$2"
  local milestone="$3"
  shift 3
  local labels="$*"
  if gh issue list -R "$REPO" --search "in:title \"$title\"" --json title --limit 5 \
       | grep -q "\"title\":\"$title\""; then
    echo "skip: $title"
    return
  fi
  gh issue create -R "$REPO" --title "$title" --body "$body" --milestone "$milestone" --label "$labels" >/dev/null
  echo "created: $title"
}

# Epics
issue "Epic E1 — Foundations & Tooling"  "Bootstrap monorepo, shared tokens, types, CI." "M0 — Bootstrap" "epic,infra"
issue "Epic E2 — Core Breathing Engine"  "Pure-TS engine + presets + Wim-Hof mode." "M0 — Bootstrap" "epic,backend"
issue "Epic E3 — Mobile UX (timer)"      "Active session screen, animations, cues." "M1 — Solo experience" "epic,frontend"
issue "Epic E4 — Library & Custom Patterns" "Browse, detail, build, share." "M1 — Solo experience" "epic,frontend"
issue "Epic E5 — Progression & Stats"    "Streak, dashboard, PRs, export." "M1 — Solo experience" "epic,frontend"
issue "Epic E6 — BOLT test"              "Guided measurement + trend." "M1 — Solo experience" "epic,frontend"
issue "Epic E7 — Auth & Profile"         "Clerk auth, onboarding, profile, deletion." "M1 — Solo experience" "epic,frontend,backend"
issue "Epic E8 — Social"                 "Friends, clans, leaderboards." "M2 — Social" "epic,frontend,backend"
issue "Epic E9 — Notifications"          "Daily reminder, streak saver, social pings." "M2 — Social" "epic,frontend,backend"
issue "Epic E10 — Quality, Compliance, Ops" "Sentry, rate-limit, ToS, store readiness." "M3 — Launch-ready" "epic,infra,safety"

# Stories (compressed acceptance criteria)
issue "E1.S1 — Monorepo bootstrap"            "pnpm workspaces + Turborepo + TS strict + lint.\n\n**AC**: pnpm install && pnpm typecheck passes." "M0 — Bootstrap" "story,infra"
issue "E1.S2 — Shared design tokens"          "@breathflow/ui exports palette/themes/space/typography/motion.\n\n**AC**: imported by both apps." "M0 — Bootstrap" "story,design"
issue "E1.S3 — Shared API types"              "@breathflow/types matches API surface.\n\n**AC**: mobile + api compile against shared types." "M0 — Bootstrap" "story,infra"
issue "E1.S4 — CI pipeline"                   "GH Actions: lint, typecheck, test, build.\n\n**AC**: failing test blocks merge." "M0 — Bootstrap" "story,infra"
issue "E1.S5 — Spike: iOS background audio"   "Validate Expo AV staysActiveInBackground for 10+ min.\n\n**AC**: ADR with conclusion." "M1 — Solo experience" "spike,frontend"
issue "E1.S6 — Spike: HRV via Health/Fit"     "Feasibility doc for HRV native modules.\n\n**AC**: written feasibility doc." "M2 — Social" "spike,frontend"

issue "E2.S1 — Breath state machine"          "Pure-TS BreathEngine with deterministic ticks.\n\n**AC**: covers lifecycle, pause/resume, skip, complete." "M0 — Bootstrap" "story,backend"
issue "E2.S2 — Preset catalogue"              "10 curated presets with metadata.\n\n**AC**: engine renders each preset; step counts match." "M0 — Bootstrap" "story,backend"
issue "E2.S3 — Wim-Hof mode"                  "Hyperventilation rounds → retention stopwatch → recovery hold.\n\n**AC**: dedicated phase events." "M1 — Solo experience" "story,backend,safety"
issue "E2.S4 — Custom pattern validation"     "0-60s phases, 0-180s holds, 1-200 rounds.\n\n**AC**: invalid params rejected at engine + API." "M1 — Solo experience" "story,backend"
issue "E2.S5 — Engine drift budget"           "Monotonic clock; < 30 ms drift over 5 min.\n\n**AC**: drift test passes." "M1 — Solo experience" "story,backend"

issue "E3.S1 — Animated breathing circle"     "Skia ring driven by Reanimated SharedValue.\n\n**AC**: 60 fps locked; reduced-motion respected." "M1 — Solo experience" "story,frontend,design"
issue "E3.S2 — Phase audio cues"              "Voice/tone/silent toggle.\n\n**AC**: cues fire within 50 ms of boundary." "M1 — Solo experience" "story,frontend"
issue "E3.S3 — Haptic cues"                   "Strong haptic on phase change.\n\n**AC**: setting respected." "M1 — Solo experience" "story,frontend"
issue "E3.S4 — Session controls"              "Pause, resume, skip, end early; lockscreen-safe.\n\n**AC**: resume continues from last tick." "M1 — Solo experience" "story,frontend"
issue "E3.S5 — Keep-awake while running"      "expo-keep-awake active during session only.\n\n**AC**: reverts after." "M1 — Solo experience" "story,frontend"
issue "E3.S6 — Post-session reflection"       "Mood + energy + notes sheet.\n\n**AC**: persists via /api/sessions." "M1 — Solo experience" "story,frontend"
issue "E3.S7 — Wim-Hof retention UI"          "Tap-to-end retention stopwatch + recovery hold.\n\n**AC**: persists longestHoldSec." "M1 — Solo experience" "story,frontend,safety"

issue "E4.S1 — Library screen"                "Filter by category + difficulty.\n\n**AC**: filters compose; persists last filter." "M1 — Solo experience" "story,frontend"
issue "E4.S2 — Pattern detail sheet"          "Preview ring + benefits + contraindications + Start.\n\n**AC**: gates advanced behind interstitial." "M1 — Solo experience" "story,frontend,safety"
issue "E4.S3 — Custom builder"                "Sliders + live preview + save.\n\n**AC**: pattern surfaces in 'Mine'." "M1 — Solo experience" "story,frontend"
issue "E4.S4 — Share a pattern"               "Short-code deep link.\n\n**AC**: link import lands in builder pre-filled." "M2 — Social" "story,frontend,backend"
issue "E4.S5 — Pattern visibility"            "private / friends / public.\n\n**AC**: enforcement at API layer." "M2 — Social" "story,backend"

issue "E5.S1 — Streak engine"                 "Daily streak with +1/reset rules.\n\n**AC**: same-day duplicates don't double-count." "M0 — Bootstrap" "story,backend"
issue "E5.S2 — Dashboard screen"              "Streak, week minutes, sparkline, donut, BOLT trend.\n\n**AC**: skeleton < 200ms." "M1 — Solo experience" "story,frontend"
issue "E5.S3 — Personal records"              "Longest hold, max rounds, longest streak.\n\n**AC**: unlock toast on PR break." "M1 — Solo experience" "story,frontend"
issue "E5.S4 — Export data (CSV)"             "Sessions + BOLT + custom patterns.\n\n**AC**: system share-sheet delivers." "M3 — Launch-ready" "story,frontend"

issue "E6.S1 — BOLT measurement screen"       "Sit → exhale → hold → tap.\n\n**AC**: ms-accurate stopwatch; saved." "M0 — Bootstrap" "story,frontend"
issue "E6.S2 — BOLT trend chart"              "Line chart with classification bands.\n\n**AC**: latest score + advice." "M1 — Solo experience" "story,frontend"

issue "E7.S1 — Sign-up / sign-in (Clerk)"     "Apple, Google, email.\n\n**AC**: server requireUser passes." "M0 — Bootstrap" "story,frontend,backend"
issue "E7.S2 — Provision user via webhook"    "Clerk webhook creates user row on first sign-in.\n\n**AC**: dashboard returns 200." "M0 — Bootstrap" "story,backend"
issue "E7.S3 — Onboarding carousel"           "4 screens: value, goal, level, optional BOLT.\n\n**AC**: writes preferences." "M1 — Solo experience" "story,frontend,design"
issue "E7.S4 — Profile edit"                  "Username uniqueness; avatar upload.\n\n**AC**: zod + DB unique." "M1 — Solo experience" "story,frontend,backend"
issue "E7.S5 — Account deletion"              "Soft → hard, 7-day grace + cron purge.\n\n**AC**: cascade delete after grace." "M3 — Launch-ready" "story,backend,safety"

issue "E8.S1 — Friend request / accept / remove" "Pending / accepted / blocked.\n\n**AC**: mutual visibility on accept." "M2 — Social" "story,frontend,backend"
issue "E8.S2 — Friends activity feed"         "Sessions of last 7 days; respect privacy.\n\n**AC**: no PII beyond username + minutes." "M2 — Social" "story,frontend,backend"
issue "E8.S3 — Create clan"                   "Name, slug, description, visibility.\n\n**AC**: creator becomes owner." "M2 — Social" "story,frontend,backend"
issue "E8.S4 — Join clan"                     "Open / request / invite.\n\n**AC**: capacity 1000." "M2 — Social" "story,frontend,backend"
issue "E8.S5 — Clan feed + leaderboard"       "Scoped to clan.\n\n**AC**: week / month / all-time." "M2 — Social" "story,frontend,backend"
issue "E8.S6 — Global leaderboard"            "Minutes practiced.\n\n**AC**: opt-out respected." "M2 — Social" "story,frontend,backend"

issue "E9.S1 — Daily reminder"                "User-chosen time, local TZ.\n\n**AC**: arrives ±5 min; respects DND." "M2 — Social" "story,frontend"
issue "E9.S2 — Streak saver"                  "Notification if streak risk < 4h.\n\n**AC**: not sent if already practised today." "M2 — Social" "story,frontend"
issue "E9.S3 — Friend / clan notifications"   "Per-source toggles.\n\n**AC**: granular settings honored." "M2 — Social" "story,frontend"

issue "E10.S1 — Crash + error monitoring"     "Sentry mobile + api.\n\n**AC**: source-mapped traces." "M3 — Launch-ready" "story,infra"
issue "E10.S2 — Privacy + ToS"                "ToS + Privacy linked from settings + signup.\n\n**AC**: GDPR + ATT." "M3 — Launch-ready" "story,safety"
issue "E10.S3 — Safety interstitial"          "Full-screen warning before Wim Hof / Bhastrika.\n\n**AC**: ack persisted per user per protocol." "M1 — Solo experience" "story,frontend,safety"
issue "E10.S4 — Rate limiting"                "100 req/min/IP; 30/min mutations.\n\n**AC**: 429 + retry-after." "M3 — Launch-ready" "story,infra,backend"
issue "E10.S5 — Performance SLO"              "Cold start ≤ 2 s P75; API P95 ≤ 300 ms.\n\n**AC**: weekly SLI dashboard." "M3 — Launch-ready" "story,infra"
issue "E10.S6 — Store readiness"              "Screenshots, listings, age rating, ATT prompts.\n\n**AC**: TestFlight + Play internal approved." "M3 — Launch-ready" "story,frontend"
