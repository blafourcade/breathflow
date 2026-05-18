---
name: seed-preset
description: Add a new breath preset to packages/breath-engine with full safety metadata.
---

# Seed a new preset

Use when the user says "add preset", "new breath protocol", or describes a breathing pattern.

## Steps

1. Open `packages/breath-engine/src/presets.ts`.
2. Append a new `BreathPattern` object. Required fields:
   - `id` (kebab-case, never reused)
   - `name` (display)
   - `slug` (kebab-case)
   - `description` (one sentence, what it does + intended effect)
   - `phases` (inhale / hold_full / exhale / hold_empty seconds)
   - `rounds`
   - `category` (calm / focus / energize / sleep / performance / pranayama / custom)
   - `difficulty` (beginner / intermediate / advanced)
   - `benefits` (string array, plain language, no medical claims)
   - `contraindications` (string array — be specific; copy from research doc)
   - `source` (paper / coach / tradition name)
3. If hyperventilation or hold > 30 s: `difficulty: "advanced"` and add to the safety-interstitial gate list in `apps/mobile/src/features/breathing/presentation/screens/session-screen.tsx`.
4. Add a unit test in `packages/breath-engine/src/engine.test.ts` checking `buildSteps(getPreset(<id>)).length` matches the expected expansion.
5. Run `pnpm --filter @breathflow/breath-engine test`.
6. Update `docs/breathwork_research.md` if the protocol is new science (cite source).
