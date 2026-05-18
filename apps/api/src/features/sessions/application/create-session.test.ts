import { describe, expect, it } from "vitest";
import { createSessionUseCase } from "./create-session";
import type {
  SessionRepository,
  StreakRepository,
} from "../domain/ports";
import type { NewSession, StreakState } from "../domain/entities";

function makeRepos() {
  const created: NewSession[] = [];
  const streaks = new Map<string, StreakState>();

  const sessions: SessionRepository = {
    async create(input) {
      created.push(input);
      return { ...input, id: "s-" + created.length } as never;
    },
    async listForUser() {
      return [];
    },
  };

  const streakRepo: StreakRepository = {
    async findByUserId(userId) {
      return streaks.get(userId) ?? null;
    },
    async save(state) {
      streaks.set(state.userId, state);
    },
  };

  return { sessions, streakRepo, streaks, created };
}

function baseSession(overrides: Partial<NewSession> = {}): NewSession {
  return {
    userId: "u1",
    patternId: null,
    patternSnapshot: {
      id: "box",
      name: "Box",
      inhale: 4,
      hold_full: 4,
      exhale: 4,
      hold_empty: 4,
      rounds: 5,
      category: "calm",
    },
    startedAt: new Date("2026-05-18T08:00:00Z"),
    endedAt: new Date("2026-05-18T08:05:00Z"),
    durationSec: 300,
    completedRounds: 5,
    totalRounds: 5,
    completedFully: true,
    longestHoldSec: 4,
    mood: 4,
    energy: 4,
    notes: null,
    ...overrides,
  };
}

describe("createSessionUseCase", () => {
  it("starts a streak at 1 on first ever session", async () => {
    const { sessions, streakRepo, streaks } = makeRepos();
    const run = createSessionUseCase({
      sessions,
      streaks: streakRepo,
      clock: { now: () => new Date() },
    });
    await run(baseSession());
    expect(streaks.get("u1")).toMatchObject({ current: 1, longest: 1 });
  });

  it("increments streak when next session is the following day", async () => {
    const { sessions, streakRepo, streaks } = makeRepos();
    const run = createSessionUseCase({
      sessions,
      streaks: streakRepo,
      clock: { now: () => new Date() },
    });
    await run(baseSession({ startedAt: new Date("2026-05-17T08:00:00Z") }));
    await run(baseSession({ startedAt: new Date("2026-05-18T08:00:00Z") }));
    expect(streaks.get("u1")).toMatchObject({ current: 2, longest: 2 });
  });

  it("resets streak after a missed day", async () => {
    const { sessions, streakRepo, streaks } = makeRepos();
    const run = createSessionUseCase({
      sessions,
      streaks: streakRepo,
      clock: { now: () => new Date() },
    });
    await run(baseSession({ startedAt: new Date("2026-05-16T08:00:00Z") }));
    await run(baseSession({ startedAt: new Date("2026-05-18T08:00:00Z") }));
    expect(streaks.get("u1")).toMatchObject({ current: 1, longest: 1 });
  });

  it("does not double-count two sessions on the same day", async () => {
    const { sessions, streakRepo, streaks } = makeRepos();
    const run = createSessionUseCase({
      sessions,
      streaks: streakRepo,
      clock: { now: () => new Date() },
    });
    await run(baseSession({ startedAt: new Date("2026-05-18T08:00:00Z") }));
    await run(baseSession({ startedAt: new Date("2026-05-18T20:00:00Z") }));
    expect(streaks.get("u1")?.current).toBe(1);
  });
});
