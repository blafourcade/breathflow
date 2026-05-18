# BreathFlow — Screens (ASCII wireframes)

Each screen lists: purpose, key components, and an ASCII sketch. Wireframes show structure only — typography hierarchy and color come from `DESIGN_SYSTEM.md`. Vertical lines mark the safe-area edges.

Notation: `[Button]` interactive, `« back » next ›` icon buttons, `─ ─` hairline, `█` filled bar, `◯◯◯◉◯` dot indicator, `▒` background imagery, `↻` swipeable.

---

## Onboarding 1 / 4 — "Why breathe"

```
│                                            │
│                                            │
│            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒                  │  full-bleed
│           ▒▒  big slow      ▒▒             │  Skia
│          ▒▒    breathing      ▒▒           │  glow
│           ▒▒     ring        ▒▒            │
│            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒                  │
│                                            │
│   Breathe with intention.                  │  display
│   Reach calm, focus, energy.               │  body
│                                            │
│   ◉◯◯◯                                     │
│                                            │
│            [Continue]                      │  primary lg
│         Already have an account →          │  ghost
```

## Onboarding 2 / 4 — Pick your goal

```
│  ‹ back                                    │
│                                            │
│   What brings you here today?              │  h1
│   Pick what you want most. You can         │  body muted
│   change this anytime.                     │
│                                            │
│   ◯ Calm                       Box, 4-7-8  │  ListItem
│   ◯ Focus                      Coherent    │
│   ◯ Energy                  Bhastrika      │
│   ◯ Sleep                      4-7-8       │
│   ◯ Performance              Wim Hof       │
│   ◯ Pranayama                Nadi Shodhana │
│                                            │
│   ◯◉◯◯                                     │
│            [Continue]                      │
```

## Onboarding 3 / 4 — Experience level

```
│  ‹ back                                    │
│   How much breathwork do you do?           │
│                                            │
│   ┌──────────────────────────┐             │
│   │   Beginner               │             │  Card selected
│   │   I'm new to this.       │             │
│   └──────────────────────────┘             │
│                                            │
│   ┌──────────────────────────┐             │
│   │   Intermediate           │             │
│   │   A few sessions a week. │             │
│   └──────────────────────────┘             │
│                                            │
│   ┌──────────────────────────┐             │
│   │   Advanced               │             │
│   │   Wim Hof, Bhastrika.    │             │
│   └──────────────────────────┘             │
│   ◯◯◉◯                                     │
│            [Continue]                      │
```

## Onboarding 4 / 4 — Optional BOLT baseline

```
│   ‹ back                                   │
│   One last thing.                          │  h1
│                                            │
│   We can measure your CO₂ tolerance        │  body muted
│   to personalise your training. Takes      │
│   about a minute.                          │
│                                            │
│            ▒▒▒▒▒▒▒▒                        │
│           ▒  illust.  ▒                    │
│            ▒▒▒▒▒▒▒▒                        │
│                                            │
│   ◯◯◯◉                                     │
│       [Measure my BOLT]                    │  primary lg
│         Maybe later →                      │  ghost
```

---

## Home

```
│   Good evening, Jules           ⚙          │  h2 + icon button
│                                            │
│   ┌──────── Pick up where you left ──────┐ │  Featured card
│   │  Box · 5 min                         │ │  PhaseRing preview
│   │  [Resume]            edit ▾          │ │
│   └──────────────────────────────────────┘ │
│                                            │
│   For tonight                              │  caption
│   ─ ── ─ ── ─ ── ─ ── ─ ── ─               │
│   ◯ 4-7-8                   4 rounds       │  ListItem
│   ◯ Coherent                10 min         │
│   ◯ Triangle                3 min          │
│                                            │
│   Your week                                │  caption
│   ┌──────────┐  ┌────────────┐             │  StatTile x2
│   │ 12 min   │  │ 4-day      │             │
│   │ practiced│  │ streak     │             │
│   └──────────┘  └────────────┘             │
│                                            │
│ ─── Home ── Library ── Stats ── Social ─── │  bottom tabbar
```

---

## Active session (Timer)

Full-bleed, no app chrome. Phase color drenches background subtly at low saturation; ring is the saturated stroke.

```
│   ─                                       ✕│   close
│                                            │
│   round 4 of 10                            │   caption muted
│   ◯◯◯◉◯◯◯◯◯◯                              │   ProgressDot
│                                            │
│                                            │
│            ▒▒▒▒▒▒▒▒▒▒▒▒                    │   PhaseRing
│          ▒▒              ▒▒                │   Skia
│         ▒▒                ▒▒               │
│        ▒▒                  ▒▒              │
│        ▒▒    Inhale         ▒▒             │   timer-phase
│        ▒▒      0:03          ▒▒            │   timer-num
│        ▒▒                  ▒▒              │
│         ▒▒                ▒▒               │
│          ▒▒              ▒▒                │
│            ▒▒▒▒▒▒▒▒▒▒▒▒                    │
│                                            │
│                                            │
│   pause ⏸   skip ⏭   end ✕                 │   icon buttons
```

Wim-Hof retention variant: the ring stops, the centre shows a count-up stopwatch; tap anywhere to end the hold; the app then transitions to recovery inhale-hold.

---

## Pattern library

```
│  Library                              + ⊕  │  h1, new pattern
│                                            │
│  ┌─ All  Calm  Focus  Energy  Sleep ─┐↻    │  Chips swipe
│                                            │
│  Curated                                   │  caption
│  ─────                                     │
│  ┌───────── Box ────────────────────┐      │  Featured card
│  │  4-4-4-4 · 5 min · beginner       │     │
│  │  Equal-length breathing. Calm and │     │
│  │  reset under stress.              │     │
│  │  [Start]                ♡         │     │
│  └──────────────────────────────────┘      │
│                                            │
│  ◯ 4-7-8           4 rds · sleep           │  ListItem rows
│  ◯ Coherent        22 rds · focus          │
│  ◯ Wim Hof         3 rds · advanced ⚠      │
│  ◯ Bhastrika       30 rds · ⚠              │
│  ◯ Nadi Shodhana   12 rds                  │
│  ◯ Physiological   5 rds · 30 s            │
│                                            │
│  Mine                                      │
│  ─────                                     │
│  ◯ Pre-meeting calm        my pattern      │
│  ◯ Pre-workout fire        my pattern      │
```

---

## Pattern detail (Bottom sheet over Library)

```
│  ░░ backdrop ░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  ─────                                    │
│  ▌handle▐                                  │  drag handle
│                                            │
│           ▒▒▒▒▒▒▒▒                         │  PhaseRing
│          ▒▒  preview ▒▒                    │  animated
│           ▒▒▒▒▒▒▒▒                         │
│                                            │
│   Wim Hof Method                           │  h2
│   advanced · performance · 8 min           │  caption
│                                            │
│   30 deep cycles, retention to capacity,   │
│   15-second recovery hold. Three rounds.   │  body
│                                            │
│   ⚠  Never in water. Never while driving.  │  warning chip
│      Pregnancy, epilepsy, cardiovascular   │
│      conditions: skip this one.            │
│                                            │
│       [Start session]                      │  primary lg
│         Edit · Share · Save                │  text actions
```

---

## Custom builder

```
│  ‹ Builder                          [Save] │
│                                            │
│           ▒▒▒▒▒▒▒▒                         │  live PhaseRing
│          ▒▒ preview ▒▒                     │  on slider edit
│           ▒▒▒▒▒▒▒▒                         │
│                                            │
│  Inhale            4.0 s                   │  Slider
│  ────●─────────────────                    │
│                                            │
│  Hold (full)       4.0 s                   │
│  ────●─────────────────                    │
│                                            │
│  Exhale            4.0 s                   │
│  ────●─────────────────                    │
│                                            │
│  Hold (empty)      4.0 s                   │
│  ────●─────────────────                    │
│                                            │
│  Rounds            10                      │
│  ────●─────────────────                    │
│                                            │
│  Total session ≈ 2 min 40 s                │  caption muted
│                                            │
│  Name      [ Pre-meeting calm        ]     │  Input
│  Category  [ Calm  ▾]                      │
│  Visibility ( Private ) Friends   Public   │  SegmentedControl
```

---

## Dashboard

Mixed-tile layout. No 2×3 same-sized grid.

```
│  Stats                                ⓘ    │
│                                            │
│  ┌────────── 4-day streak ─────────────┐   │  Hero StatTile
│  │  longest: 18 days                    │   │
│  │  ████ ████ ████ ████ ▒▒▒▒ ▒▒▒▒ ▒▒▒▒ │   │  M T W T F S S
│  └─────────────────────────────────────┘   │
│                                            │
│  ┌── 12 min ─┐  ┌── 47 sessions ────────┐  │
│  │  this wk  │  │  all time            │  │  StatTile pair
│  └───────────┘  └──────────────────────┘  │
│                                            │
│  BOLT trend                                │
│  ─────────────                             │
│         ╭─╮                                │  line chart with
│        ╱   ╲   ╭──╮         ╭─             │  classification
│   ────╯     ╲─╯    ╲───────╯               │  bands
│                                            │
│   latest 28 s · moderate                   │  caption
│                                            │
│  Categories                                │
│  ─────                                     │
│  Calm ████████████████████████ 64%         │
│  Focus ██████████ 22%                      │
│  Sleep ████ 9%                             │
│  Performance █ 5%                          │
│                                            │
│  Records                                   │
│  ◯ Longest hold        1:42 · Wim Hof      │
│  ◯ Best round count    34 · Bhastrika      │
│  ◯ Earliest session    05:48 · Coherent    │
```

---

## BOLT test (guided)

```
│  ‹ BOLT                                    │
│                                            │
│  Step 2 of 3                               │  caption
│                                            │
│  Take one normal breath in.                │  h2
│  Now exhale gently.                        │
│                                            │
│           ▒▒▒▒▒▒▒▒▒                        │  Skia
│          ▒▒  ring   ▒▒                     │  collapsing
│           ▒▒▒▒▒▒▒▒                         │
│                                            │
│  Hold your breath until the                │
│  first urge to breathe.                    │  body
│                                            │
│  When you feel it, tap.                    │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │             0 : 12                   │  │  timer-num
│  │     [   tap when ready   ]           │  │  full-width
│  └──────────────────────────────────────┘  │  primary button
│                                            │
│  Don't strain. The test ends at the        │  caption muted
│  first signal, not at maximum effort.      │
```

Result screen:

```
│  ‹                                         │
│   Your BOLT                                │  caption
│   28 seconds                               │  display
│   Moderate                                 │  h2 colored
│                                            │
│   Average · maintain practice and add      │  body muted
│   CO₂-tolerance work like Buteyko Light    │
│   or extended exhales.                     │
│                                            │
│  ┌─ trend last 6 measurements ──────────┐  │
│  │                                       │  │
│  │   ─ ─ ─ ─ ─ ●─── ●─── ●               │  │  line chart
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                            │
│         [Done]                             │
```

---

## Friends

```
│  Social                       Friends ▾    │  h1, switcher
│                                            │
│  ┌──── Add a friend by username ────────┐  │  Input
│  │  @ jules.calm                  → +   │  │
│  └───────────────────────────────────────┘ │
│                                            │
│  Activity                                  │
│  ─────                                     │
│  ◉ Élise practiced 9 min · Box · 2 h ago   │  list rows with
│  ◉ Maxime hit a 3-day streak · 5 h ago     │  avatar 40
│  ◉ Élise made "Pre-call calm" public · 1 d │
│                                            │
│  Pending                                   │
│  ─────                                     │
│  ◯ @ jules.calm        ▸ accept  ▸ decline │
│                                            │
│  My friends                                │
│  ─────                                     │
│  ◉ Élise           accepted    minutes 412 │  ListItem
│  ◉ Maxime          accepted    minutes 218 │
```

---

## Clans

```
│  Social                          Clans ▾   │
│                                            │
│  My clans                                  │
│  ─────                                     │
│  ┌──── 🜂 Sunrise Crew ─────── 87 mbrs ──┐ │  Card
│  │  Daily morning practice               │ │
│  │  this week  ████████  3.2 hrs total   │ │
│  └────────────────────────────────────────┘ │
│                                            │
│  Discover                                  │
│  ─────                                     │
│  ◯ 🜁 Apnea Coast        212 mbrs · open    │
│  ◯ 🜃 Office Calm         48 mbrs · request │
│  ◯ 🜄 Sleep Tribe        134 mbrs · open    │
│                                            │
│            [Create a clan]                 │  ghost button
```

Clan detail (when entering one):

```
│  ‹ Sunrise Crew                            │
│                                            │
│   🜂  Daily morning practice. 5-min        │  description
│   coherent + 5-min box. Be kind.           │
│                                            │
│   ─── Feed ── Leaderboard ── Members ───   │  tabs
│                                            │
│   This week                                │  caption
│   1  Élise            74 min               │
│   2  Maxime           58 min               │
│   3  Jules            41 min               │
│   ...                                      │
```

---

## Leaderboard (global)

```
│  Leaderboard                    ⚙          │
│                                            │
│   ── Week ── Month ── All time ──          │  SegmentedControl
│                                            │
│   You · #42                                │  caption highlight
│   42  ◉ jules.calm     34 min              │
│   ─                                        │
│   1  ◉ b.deep         8 h 12 min            │
│   2  ◉ aria           7 h 4 min             │
│   3  ◉ pneuma         6 h 51 min            │
│   ...                                      │
```

---

## Profile

```
│  Profile                       edit ✎      │
│                                            │
│              ◉                             │  Avatar xl
│         jules.calm                         │  h2
│       member since may 2026                │  caption muted
│                                            │
│   ┌── 412 min ──┐  ┌── 12-day streak ──┐  │  StatTile pair
│                                            │
│   Recent sessions                          │
│   ─────                                    │
│   ◯ 9 min   Box        2 h ago             │  ListItem rows
│   ◯ 5 min   4-7-8      yesterday           │
│   ◯ 12 min  Wim Hof    2 d ago             │
│                                            │
│   ─────                                    │
│           [Sign out]                       │  ghost
```

---

## Settings

```
│  ‹ Settings                                │
│                                            │
│   Account                                  │
│   ─────                                    │
│   ◯ Email             jules@…              │
│   ◯ Username          jules.calm           │
│   ◯ Manage subscription          ›         │
│                                            │
│   Practice                                 │
│   ─────                                    │
│   ◯ Cue style        Voice ▾               │
│   ◯ Cue volume       ────●──               │  Slider
│   ◯ Haptics          [⬤  ]                 │  Switch
│   ◯ Reminder time    07:30                 │
│   ◯ Default protocol Coherent ▾            │
│                                            │
│   Appearance                               │
│   ─────                                    │
│   ◯ Theme            Dark · Light · Auto   │  SegmentedControl
│   ◯ Reduced motion   follow system         │
│                                            │
│   Privacy                                  │
│   ─────                                    │
│   ◯ Friends activity                       │
│   ◯ Global leaderboard                     │
│   ◯ Export my data           ›             │
│   ◯ Delete account            ›            │  danger color
│                                            │
│   BreathFlow v0.1.0 · not medical advice   │  caption micro
```

---

## Safety interstitial (hard modal)

Appears once per protocol per user, before the first session of Wim Hof / Bhastrika / Buteyko-advanced.

```
│                                            │
│                                            │
│   ⚠                                        │  danger color
│                                            │
│   Before you start Wim Hof.                │  h1
│                                            │
│   Never practise:                          │  body
│   ·  in or near water                      │
│   ·  while driving or operating machinery  │
│   ·  while standing in an unsafe spot      │
│                                            │
│   Skip this protocol if you have:          │
│   ·  cardiovascular disease                │
│   ·  epilepsy                              │
│   ·  high blood pressure                   │
│   ·  pregnancy                             │
│   ·  recent surgery                        │
│                                            │
│   BreathFlow is not medical advice.        │  caption muted
│   When in doubt, talk to a doctor.         │
│                                            │
│  ─────────────────────────────             │
│   ◻ I understand.                          │  Checkbox
│                                            │
│   [Start anyway]              not now      │  primary danger + ghost
```

`Start anyway` is disabled until the checkbox is ticked. Acknowledgement is persisted (`safety_ack` per user per protocol).

---

## Tab bar

A four-item bottom tab bar on every primary surface (Home / Library / Stats / Social). 56 h, surface background, hairline top border, icon + label. Pressed = label color = `accent.sky`, icon switches to filled variant.

```
│  ─── Home  Library  Stats  Social ───      │
│      ⌂      ☵        ▤      ⌬              │
```

Profile lives behind the avatar in the Home header — not a fifth tab — keeping the bar at four predictable destinations.

---

## Empty states

Every list ships with an empty state that teaches the feature.

- Library "Mine": "You haven't built a pattern yet. Try the builder for a 6-3-6-3 to start."
- Stats: "Run a session and check back here. Your streak will live here."
- Friends: "Friends practise together. Send your first invite."
- Leaderboard: "Practise this week to land on the board."

No "Nothing here." Ever.

---

## Loading states

Skeleton tiles. No spinners inside content blocks. The phase-ring preview is the only place a spinner is acceptable, and only when downloading a remote pattern.

---

## Error states

Inline first, modal never. Network errors collapse to a banner above the tab bar; tap-to-retry. Validation errors live under the offending input. Auth errors send the user to a re-auth screen instead of a destructive logout.
