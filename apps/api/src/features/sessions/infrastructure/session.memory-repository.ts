import type { NewSession, SessionEntity, StreakState } from "../domain/entities";
import type { SessionRepository, StreakRepository } from "../domain/ports";

let counter = 0;
const sessions: SessionEntity[] = [];
const streaks = new Map<string, StreakState>();

export const memorySessionRepository: SessionRepository = {
  async create(input: NewSession): Promise<SessionEntity> {
    counter += 1;
    const created: SessionEntity = {
      id: `mem-session-${counter}`,
      userId: input.userId,
      patternId: input.patternId,
      patternSnapshot: input.patternSnapshot,
      startedAt: input.startedAt,
      endedAt: input.endedAt,
      durationSec: input.durationSec,
      completedRounds: input.completedRounds,
      totalRounds: input.totalRounds,
      completedFully: input.completedFully,
      longestHoldSec: input.longestHoldSec,
      mood: input.mood,
      energy: input.energy,
      notes: input.notes,
    };
    sessions.push(created);
    return created;
  },
  async listForUser(userId, limit): Promise<SessionEntity[]> {
    return sessions
      .filter((s) => s.userId === userId)
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
      .slice(0, limit);
  },
};

export const memoryStreakRepository: StreakRepository = {
  async findByUserId(userId) {
    return streaks.get(userId) ?? null;
  },
  async save(state) {
    streaks.set(state.userId, state);
  },
};

export function _memoryStore() {
  return { sessions, streaks };
}
