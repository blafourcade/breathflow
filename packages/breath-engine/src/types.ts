export type Phase = "inhale" | "hold_full" | "exhale" | "hold_empty";

export interface PhaseDuration {
  inhale: number;
  hold_full: number;
  exhale: number;
  hold_empty: number;
}

export interface BreathPattern {
  id: string;
  name: string;
  slug: string;
  description: string;
  phases: PhaseDuration;
  rounds: number;
  category: BreathCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  benefits: string[];
  contraindications: string[];
  source?: string;
  recoveryHoldEmpty?: number;
  hyperventilationCycles?: number;
}

export type BreathCategory =
  | "calm"
  | "focus"
  | "energize"
  | "sleep"
  | "performance"
  | "pranayama"
  | "custom";

export interface SessionTick {
  phase: Phase;
  phaseIndex: number;
  round: number;
  totalRounds: number;
  elapsedInPhaseMs: number;
  phaseDurationMs: number;
  totalElapsedMs: number;
  progressInPhase: number;
}

export interface SessionResult {
  patternId: string;
  startedAt: number;
  endedAt: number;
  completedRounds: number;
  totalRounds: number;
  totalDurationMs: number;
  completedFully: boolean;
  longestHoldMs?: number;
}

export type EngineState = "idle" | "running" | "paused" | "completed";
