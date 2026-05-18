import { describe, expect, it, vi } from "vitest";
import { BreathEngine, buildSteps, estimateTotalDurationMs } from "./engine";
import { getPreset, PRESETS } from "./presets";
import { classifyBolt, averageBolt } from "./bolt";

describe("buildSteps", () => {
  it("expands a box pattern to 4 phases per round", () => {
    const box = getPreset("box-4-4-4-4")!;
    const steps = buildSteps(box);
    expect(steps).toHaveLength(4 * box.rounds);
    expect(steps[0]?.phase).toBe("inhale");
    expect(steps[1]?.phase).toBe("hold_full");
    expect(steps[2]?.phase).toBe("exhale");
    expect(steps[3]?.phase).toBe("hold_empty");
  });

  it("skips zero-duration phases (4-7-8 has no empty hold)", () => {
    const p = getPreset("4-7-8")!;
    const steps = buildSteps(p);
    expect(steps).toHaveLength(3 * p.rounds);
    expect(steps.every((s) => s.phase !== "hold_empty")).toBe(true);
  });

  it("expands Wim Hof with hyperventilation cycles and recovery", () => {
    const wh = getPreset("wim-hof")!;
    const steps = buildSteps(wh);
    const perRound = wh.hyperventilationCycles! * 2 + 3;
    expect(steps).toHaveLength(perRound * wh.rounds);
  });

  it("estimateTotalDurationMs returns positive duration for all presets", () => {
    for (const p of PRESETS) {
      expect(estimateTotalDurationMs(p)).toBeGreaterThan(0);
    }
  });
});

describe("BreathEngine", () => {
  it("runs through one full round and reports completion", async () => {
    let mockTime = 0;
    const pattern = {
      ...getPreset("box-4-4-4-4")!,
      rounds: 1,
      phases: { inhale: 0.05, hold_full: 0.05, exhale: 0.05, hold_empty: 0.05 },
    };
    const onComplete = vi.fn();
    const onPhaseChange = vi.fn();
    const onRoundComplete = vi.fn();

    const engine = new BreathEngine(
      pattern,
      { onComplete, onPhaseChange, onRoundComplete },
      { now: () => mockTime },
    );

    vi.useFakeTimers();
    engine.start();
    for (let i = 0; i < 30; i++) {
      mockTime += 50;
      vi.advanceTimersByTime(50);
    }
    vi.useRealTimers();

    expect(onPhaseChange).toHaveBeenCalled();
    expect(onRoundComplete).toHaveBeenCalledWith(1);
    expect(onComplete).toHaveBeenCalled();
    expect(engine.getState()).toBe("completed");
  });

  it("pause stops ticks, resume continues", () => {
    let mockTime = 0;
    const pattern = {
      ...getPreset("box-4-4-4-4")!,
      rounds: 1,
      phases: { inhale: 1, hold_full: 0, exhale: 0, hold_empty: 0 },
    };
    const ticks: number[] = [];
    const engine = new BreathEngine(
      pattern,
      { onTick: (t) => ticks.push(t.totalElapsedMs) },
      { now: () => mockTime },
    );
    vi.useFakeTimers();
    engine.start();
    mockTime += 200;
    vi.advanceTimersByTime(200);
    const before = ticks.length;
    engine.pause();
    mockTime += 500;
    vi.advanceTimersByTime(500);
    expect(ticks.length).toBe(before);
    engine.resume();
    mockTime += 100;
    vi.advanceTimersByTime(100);
    expect(ticks.length).toBeGreaterThan(before);
    vi.useRealTimers();
    engine.stop();
  });

  it("skipPhase jumps to next phase", () => {
    const pattern = {
      ...getPreset("box-4-4-4-4")!,
      rounds: 1,
      phases: { inhale: 10, hold_full: 10, exhale: 10, hold_empty: 10 },
    };
    const phases: string[] = [];
    const engine = new BreathEngine(pattern, {
      onPhaseChange: (p) => phases.push(p),
    });
    engine.start();
    engine.skipPhase();
    engine.skipPhase();
    expect(phases).toEqual(["inhale", "hold_full", "exhale"]);
    engine.stop();
  });
});

describe("BOLT", () => {
  it("classifies known thresholds", () => {
    expect(classifyBolt(5)).toBe("very_low");
    expect(classifyBolt(15)).toBe("low");
    expect(classifyBolt(25)).toBe("moderate");
    expect(classifyBolt(35)).toBe("good");
    expect(classifyBolt(45)).toBe("excellent");
  });
  it("averages measurements", () => {
    expect(
      averageBolt([
        { seconds: 10, recordedAt: 0 },
        { seconds: 20, recordedAt: 0 },
      ]),
    ).toBe(15);
    expect(averageBolt([])).toBeNull();
  });
});
