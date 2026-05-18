# BreathFlow — Design System

## Scene & register

> A user sitting in a dimly lit bedroom at 23:30, phone in one hand, dimming the lights, closing their eyes between breaths. Or at sunrise on a yoga mat. Or on the locker-room bench before a workout.

These scenes force the answer:

- **Theme**: dark by default. Light is an explicit user setting; never marketed.
- **Register**: hybrid. Library / Dashboard / Settings / Social are **product** — calm, predictable, familiar. The **Timer** and **Onboarding** lean **brand-drenched** — the surface IS the breath colour.
- **Color strategy**: Restrained on product surfaces (tinted ink + one luminous accent). Drenched per-phase on the active timer.

## Color tokens

Anchored in `packages/ui/src/tokens.ts`. Ink scale tinted toward `oklch(15% 0.02 240)` (cool ink — a hair of blue). Phase colors are deliberate, not decorative.

| Role            | Token                       | OKLCH approx        | Where                         |
| --------------- | --------------------------- | ------------------- | ----------------------------- |
| Background      | `themes.dark.bg`            | 8% 0.012 240        | App shell                     |
| Surface         | `themes.dark.surface`       | 13% 0.014 240       | Cards, sheets                 |
| Surface (elev)  | `themes.dark.surfaceElev`   | 18% 0.016 240       | Floating, hover               |
| Border          | `themes.dark.border`        | 27% 0.018 240       | Hairlines (1 px)              |
| Text            | `themes.dark.text`          | 96% 0.005 240       | Primary copy                  |
| Text muted      | `themes.dark.textMuted`     | 70% 0.010 240       | Labels, captions              |
| Text dim        | `themes.dark.textDim`       | 55% 0.014 240       | Hints, placeholders           |
| Inhale          | `palette.breath.inhale`     | 80% 0.115 245       | Active phase = inhale         |
| Hold full       | `palette.breath.holdFull`   | 73% 0.16  295       | Active phase = hold full      |
| Exhale          | `palette.breath.exhale`     | 78% 0.16  155       | Active phase = exhale         |
| Hold empty      | `palette.breath.holdEmpty`  | 50% 0.03  240       | Active phase = hold empty     |
| Success / PR    | `semantic.success`          | 78% 0.16  155       | Streak hits, PR toast         |
| Warning         | `semantic.warning`          | 86% 0.13   85       | Soft warnings                 |
| Danger          | `semantic.danger`           | 72% 0.18   25       | Safety interstitial, errors   |

**Rules**:
- The single accent on product surfaces is `palette.accent.sky` (= `breath.inhale`). One thing on the screen is "lit"; everything else recedes.
- Never `#000`. Background is tinted ink, not pure black.
- Drenched timer screen uses the active phase color at chroma full strength, with the rest of the UI dimmed to `surface` and `textMuted`.

## Typography

Single family: **Inter** (`Inter_400Regular`, `_500Medium`, `_600SemiBold`, `_700Bold`). Loaded with `expo-font` via `@expo-google-fonts/inter`.

Scale ratio 1.25 between steps. Fixed rem-equivalent (RN: numeric `fontSize`), no fluid clamps.

| Step       | Size / line-height | Use                           |
| ---------- | ------------------ | ----------------------------- |
| display    | 40 / 48 Bold       | Onboarding hero, BOLT score   |
| h1         | 32 / 40 Bold       | Screen titles                 |
| h2         | 24 / 32 Semibold   | Section headers               |
| h3         | 20 / 28 Semibold   | Card titles                   |
| body       | 16 / 24 Regular    | Paragraphs                    |
| bodyBold   | 16 / 24 Semibold   | Emphasised body               |
| caption    | 13 / 18 Regular    | Captions, axis labels         |
| micro      | 11 / 14 Medium     | Pills, chips                  |
| timer-num  | 88 / 96 Bold       | Active-session countdown only |
| timer-phase| 28 / 36 Medium     | "Inhale / Hold / Exhale"      |

Tabular numerals for any countdown or stat display.

## Spacing & layout

Spacing scale lives in tokens (`space[1..32]`). Rhythm rules:

- **Section gap (vertical between sections)**: `space.10` (40 px).
- **Card padding**: `space.5` (20 px).
- **List item padding**: `space.4` (16 px) vertical, `space.5` horizontal.
- **Screen padding**: `space.5` left/right; `space.6` top under header.
- **Safe areas**: respect device insets via `react-native-safe-area-context`.

Avoid card-grid uniformity (shared-law ban). Use mixed elements: a featured card, a row of chips, a sparkline strip — never six identical icon-headline-text tiles in a 2×3.

## Radius

| Token       | Value | Use                                |
| ----------- | ----- | ---------------------------------- |
| `radius.sm` | 8     | Chips, small buttons               |
| `radius.md` | 12    | Inputs, dense buttons              |
| `radius.lg` | 16    | Cards                              |
| `radius.xl` | 24    | Bottom sheets, modal headers       |
| `radius.2xl`| 32    | Hero cards, phase ring container   |
| `radius.full`| 9999 | Avatars, pills                     |

## Elevation

Dark-mode shadows are subtle; primary depth comes from surface luminance, not blur.

- `elevation.sm` — list rows that lift on press.
- `elevation.md` — floating buttons.
- `elevation.lg` — bottom sheets, modals.

## Motion

- **Standard**: 200 ms ease-out-quart for state changes (button press, list-item expand).
- **Reveal**: 320 ms ease-out-quint for sheets, screen transitions.
- **Breath**: phase-bound; duration = active phase length. Easing = `motion.easing.breath` (`[0.45, 0, 0.55, 1]` — symmetrical, smooth, no hang). The animation runs on the Reanimated UI thread; the engine `onTick` only updates the state machine, not the visual.

**Reduced motion**: when `AccessibilityInfo.isReduceMotionEnabled`:
- Phase ring stops expanding/contracting; it crossfades color between phases over 200 ms.
- Sheets fade in/out instead of sliding.
- Onboarding parallax disabled.

**Never**: bounce, elastic, sparkle, page-load orchestrations.

## Iconography

`expo-symbols` (SF Symbols + Android Material fallback) at 24 / 20 / 16 sizes. One stroke family. Never two icon vocabularies on the same screen.

## Accessibility

- **Contrast**: text on `bg` ≥ 7:1 (AAA) for body; ≥ 4.5:1 (AA) for muted text on `surfaceElev`. Phase colors on dark surface measured per pairing.
- **Hit targets**: 44 × 44 minimum (iOS HIG); 48 × 48 on Android.
- **VoiceOver / TalkBack labels** on every interactive control. Phase ring exposes `accessibilityValue` ("Inhale, 3 seconds left, round 4 of 10").
- **Dynamic type**: respect platform scaling up to 130%; UI tested at default + 130%.
- **Reduced transparency**: replace blurs with solid surfaces when `isReduceTransparencyEnabled`.

## Component inventory

### Button
Variants: `primary`, `secondary`, `ghost`, `danger`. Sizes: `lg` (52 h, used for hero CTAs), `md` (44 h), `sm` (32 h, used in toolbars). States: default, hover (web/keyboard only), pressed (0.97 scale + 100 ms ease-out), disabled (50% opacity), loading (icon spinner + label dim). Primary = `accent.sky` background on dark, `ink.900` text. Ghost = transparent, `textMuted` label, `border` on focus.

### Card
Padding `space.5`, radius `lg`, background `surface`. One element per card unless the card *is* a list (Dashboard tiles can stack 2 stats — see StatTile). No nested cards.

### PhaseRing
The hero of the timer. Skia canvas. A single ring whose stroke radius + color animate per phase. Inhale = radius grows from 35% → 95% of the smaller viewport side, color lerps to `inhale`. Hold full = radius locked at 95%, color holds. Exhale = radius shrinks, color lerps to `exhale`. Hold empty = radius locked at 35%, color = `holdEmpty`. Centre text shows phase label + remaining seconds. Outer halo (8 % opacity, 60 px blur) breathes with it.

### StatTile
Used on Dashboard. Layout: small label top, large number, optional sparkline below or trend caption. 2-up grid for the top row; the rest is mixed (sparkline strip, donut, list).

### Slider
Custom on RN. Track `border`, fill `accent.sky`, thumb `surfaceElev` with `border` ring. Numeric label hovers above thumb. Long-press for fine adjustment (0.5-second granularity in pattern builder).

### Chip
Pill, 32 h, `surfaceElev` background, `textMuted` label. Selected: `accent.sky` background, `ink.900` label.

### SegmentedControl
Used for period filters ("Week / Month / All-time"). Background `surface`, selected slug `surfaceElev` with `border`, label `text`. Two or three segments only — fall back to a dropdown beyond that.

### BottomSheet
Modal with drag handle, radius `xl` top corners. Backdrop `ink.900 / 0.6`. Opens 250 ms ease-out-quint. Closeable by drag-down past 40% or backdrop tap. Used for: pattern detail "Start now / Edit / Share / Delete", post-session reflection, friend actions.

### Modal (hard)
Full-screen, no dismiss except explicit button. Reserved for safety interstitial, irreversible actions, account deletion confirmation.

### ListItem
Layout: optional leading (avatar/icon 40 px), content (title + caption), trailing (chevron / metric / switch). Pressed state lifts to `elevation.sm`. Default vertical padding `space.4`.

### Avatar
Sizes: `xs` (24), `sm` (32), `md` (40), `lg` (56), `xl` (96 — profile only). Fallback: two initials on a ring whose hue derives from the user id.

### ProgressDot
Five dots horizontally, one per round position, filled as rounds complete. Used on timer screen above the ring.

### Toast
Bottom-aligned, slides up 250 ms, auto-dismisses 3 s. Types: `success`, `info`, `warning`, `danger`. Tap to dismiss. Used for PR toasts ("New longest hold: 1:42"), sync errors, friend-request actions.

## Anti-patterns we explicitly reject

- Identical icon-headline-text card grids on Library or Dashboard.
- Gradient text on metrics (use weight + size).
- Side-stripe colored borders on cards.
- Glassmorphism for decoration. Blur is permitted only on the safety interstitial scrim.
- The "hero-metric SaaS" template on Dashboard. We mix tile sizes and content kinds.
- Display-font numbers in lists. Tabular Inter only.
- Confetti / sparkles / lottie celebrations. A two-second toast and a tactile haptic is enough.

## Voice & UX copy

- Imperative, calm, second person. "Take a slow breath in." not "Inhaling will commence."
- No exclamation marks outside achievement toasts.
- Never medical claims. Footer: "BreathFlow is not medical advice."
- No em dashes. Commas, colons, periods, parentheses.

## Files

- Tokens: `packages/ui/src/tokens.ts`.
- Theme provider (mobile): `apps/mobile/src/shared/ui/theme-provider.tsx`.
- Component sources: `apps/mobile/src/shared/ui/`.
- Storybook (deferred): `apps/storybook` (post-launch).
