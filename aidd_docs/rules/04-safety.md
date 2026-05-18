---
name: safety
description: Safety bar for advanced breathwork protocols and medical claims.
applies_to: ["**"]
---

# Safety rules

1. **Never make medical claims.** Use "may help" / "supports". Always show the disclaimer "BreathFlow is not medical advice" on screens that list benefits.
2. **Advanced protocols are gated.** First-time use of Wim Hof, Bhastrika, or advanced Buteyko triggers a full-screen safety interstitial. Ack is persisted per user per protocol.
3. **Contraindications surface to the user**, not just the docs. Drawn from preset metadata in `packages/breath-engine`.
4. **Retentions** never auto-start in a session if the user is using the app while moving (Wim Hof retention is tap-to-end with explicit "don't do this in water" warning beforehand).
5. **Audio-only mode** disables haptics and bright color flashes — accessibility for people with photosensitive epilepsy.

Adding a new preset?

- Fill `contraindications` with the actual list.
- If the protocol involves hyperventilation OR retention > 30 s, mark `difficulty: "advanced"` and include in the safety interstitial gate.
- Cite the source.
