import * as Haptics from "expo-haptics";
import type { Phase } from "@breathflow/breath-engine";

let lastPhase: Phase | null = null;

export async function onPhaseBoundary(phase: Phase) {
  if (lastPhase === phase) return;
  lastPhase = phase;
  try {
    if (phase === "inhale" || phase === "hold_full") {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  } catch {
    // haptics may not be available on web/simulator
  }
}

export function resetCues() {
  lastPhase = null;
}
