import type { NewSession, SessionEntity } from "../domain/entities.js";
import type {
  Clock,
  SessionRepository,
  StreakRepository,
} from "../domain/ports.js";

export interface CreateSessionDeps {
  sessions: SessionRepository;
  streaks: StreakRepository;
  clock: Clock;
}

export function createSessionUseCase(deps: CreateSessionDeps) {
  return async (input: NewSession): Promise<SessionEntity> => {
    const created = await deps.sessions.create(input);
    await applyStreak(deps.streaks, input.userId, input.startedAt);
    return created;
  };
}

async function applyStreak(
  repo: StreakRepository,
  userId: string,
  sessionDate: Date,
): Promise<void> {
  const day = dayKey(sessionDate);
  const existing = await repo.findByUserId(userId);
  if (!existing) {
    await repo.save({ userId, current: 1, longest: 1, lastSessionDay: day });
    return;
  }
  if (existing.lastSessionDay === day) return;
  const diffDays = existing.lastSessionDay
    ? daysBetween(existing.lastSessionDay, day)
    : null;
  const next = diffDays === 1 ? existing.current + 1 : 1;
  await repo.save({
    userId,
    current: next,
    longest: Math.max(existing.longest, next),
    lastSessionDay: day,
  });
}

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const aDate = new Date(a + "T00:00:00Z").getTime();
  const bDate = new Date(b + "T00:00:00Z").getTime();
  return Math.round((bDate - aDate) / 86_400_000);
}
