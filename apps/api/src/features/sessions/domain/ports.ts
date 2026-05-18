import type { NewSession, SessionEntity, StreakState } from "./entities";

export interface SessionRepository {
  create(session: NewSession): Promise<SessionEntity>;
  listForUser(userId: string, limit: number): Promise<SessionEntity[]>;
}

export interface StreakRepository {
  findByUserId(userId: string): Promise<StreakState | null>;
  save(state: StreakState): Promise<void>;
}

export interface Clock {
  now(): Date;
}
