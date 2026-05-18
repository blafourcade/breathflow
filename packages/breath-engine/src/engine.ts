import type {
  BreathPattern,
  EngineState,
  Phase,
  PhaseDuration,
  SessionResult,
  SessionTick,
} from "./types.js";

export interface EngineCallbacks {
  onTick?: (tick: SessionTick) => void;
  onPhaseChange?: (phase: Phase, round: number) => void;
  onRoundComplete?: (round: number) => void;
  onComplete?: (result: SessionResult) => void;
  onStateChange?: (state: EngineState) => void;
}

interface PhaseStep {
  phase: Phase;
  durationMs: number;
  round: number;
}

const PHASE_ORDER: Phase[] = ["inhale", "hold_full", "exhale", "hold_empty"];

export class BreathEngine {
  private pattern: BreathPattern;
  private steps: PhaseStep[] = [];
  private stepIndex = 0;
  private elapsedInStep = 0;
  private state: EngineState = "idle";
  private startedAt = 0;
  private totalElapsed = 0;
  private lastTickAt = 0;
  private rafHandle: ReturnType<typeof setInterval> | null = null;
  private completedRounds = 0;
  private callbacks: EngineCallbacks;
  private now: () => number;

  constructor(
    pattern: BreathPattern,
    callbacks: EngineCallbacks = {},
    options: { now?: () => number } = {},
  ) {
    this.pattern = pattern;
    this.callbacks = callbacks;
    this.now = options.now ?? Date.now;
    this.steps = buildSteps(pattern);
  }

  getState(): EngineState {
    return this.state;
  }

  getCurrentStep(): PhaseStep | null {
    return this.steps[this.stepIndex] ?? null;
  }

  start(): void {
    if (this.state === "running") return;
    if (this.state === "idle" || this.state === "completed") {
      this.stepIndex = 0;
      this.elapsedInStep = 0;
      this.totalElapsed = 0;
      this.completedRounds = 0;
      this.startedAt = this.now();
      const first = this.steps[0];
      if (first) {
        this.callbacks.onPhaseChange?.(first.phase, first.round);
      }
    }
    this.setState("running");
    this.lastTickAt = this.now();
    this.rafHandle = setInterval(() => this.tick(), 50);
  }

  pause(): void {
    if (this.state !== "running") return;
    this.clearTimer();
    this.setState("paused");
  }

  resume(): void {
    if (this.state !== "paused") return;
    this.lastTickAt = this.now();
    this.rafHandle = setInterval(() => this.tick(), 50);
    this.setState("running");
  }

  stop(): SessionResult {
    this.clearTimer();
    const result = this.buildResult(false);
    this.setState("completed");
    this.callbacks.onComplete?.(result);
    return result;
  }

  skipPhase(): void {
    this.advanceStep();
  }

  private tick(): void {
    if (this.state !== "running") return;
    const now = this.now();
    const dt = now - this.lastTickAt;
    this.lastTickAt = now;
    this.elapsedInStep += dt;
    this.totalElapsed += dt;

    const step = this.steps[this.stepIndex];
    if (!step) {
      this.complete();
      return;
    }
    const progress =
      step.durationMs > 0
        ? Math.min(1, this.elapsedInStep / step.durationMs)
        : 1;

    this.callbacks.onTick?.({
      phase: step.phase,
      phaseIndex: this.stepIndex,
      round: step.round,
      totalRounds: this.pattern.rounds,
      elapsedInPhaseMs: this.elapsedInStep,
      phaseDurationMs: step.durationMs,
      totalElapsedMs: this.totalElapsed,
      progressInPhase: progress,
    });

    if (this.elapsedInStep >= step.durationMs) {
      this.advanceStep();
    }
  }

  private advanceStep(): void {
    const prev = this.steps[this.stepIndex];
    this.stepIndex += 1;
    this.elapsedInStep = 0;
    const next = this.steps[this.stepIndex];

    if (prev && next && prev.round !== next.round) {
      this.completedRounds = prev.round;
      this.callbacks.onRoundComplete?.(prev.round);
    }

    if (!next) {
      this.completedRounds = this.pattern.rounds;
      this.complete();
      return;
    }
    this.callbacks.onPhaseChange?.(next.phase, next.round);
  }

  private complete(): void {
    this.clearTimer();
    const result = this.buildResult(true);
    this.setState("completed");
    this.callbacks.onComplete?.(result);
  }

  private buildResult(completedFully: boolean): SessionResult {
    return {
      patternId: this.pattern.id,
      startedAt: this.startedAt,
      endedAt: this.now(),
      completedRounds: this.completedRounds,
      totalRounds: this.pattern.rounds,
      totalDurationMs: this.totalElapsed,
      completedFully,
    };
  }

  private clearTimer(): void {
    if (this.rafHandle != null) {
      clearInterval(this.rafHandle);
      this.rafHandle = null;
    }
  }

  private setState(state: EngineState): void {
    if (this.state === state) return;
    this.state = state;
    this.callbacks.onStateChange?.(state);
  }
}

export function buildSteps(pattern: BreathPattern): PhaseStep[] {
  const steps: PhaseStep[] = [];

  if (pattern.hyperventilationCycles && pattern.recoveryHoldEmpty) {
    for (let round = 1; round <= pattern.rounds; round++) {
      for (let i = 0; i < pattern.hyperventilationCycles; i++) {
        pushIfNonZero(steps, "inhale", pattern.phases.inhale, round);
        pushIfNonZero(steps, "exhale", pattern.phases.exhale, round);
      }
      pushIfNonZero(steps, "hold_empty", pattern.recoveryHoldEmpty, round);
      pushIfNonZero(steps, "inhale", pattern.phases.inhale, round);
      pushIfNonZero(steps, "hold_full", 15, round);
    }
    return steps;
  }

  for (let round = 1; round <= pattern.rounds; round++) {
    for (const phase of PHASE_ORDER) {
      const duration = pattern.phases[phase as keyof PhaseDuration];
      pushIfNonZero(steps, phase, duration, round);
    }
  }
  return steps;
}

function pushIfNonZero(
  steps: PhaseStep[],
  phase: Phase,
  seconds: number,
  round: number,
): void {
  if (seconds <= 0) return;
  steps.push({ phase, durationMs: seconds * 1000, round });
}

export function estimateTotalDurationMs(pattern: BreathPattern): number {
  return buildSteps(pattern).reduce((sum, s) => sum + s.durationMs, 0);
}
