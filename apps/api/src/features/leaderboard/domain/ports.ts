import type { LeaderboardEntry, LeaderboardPeriod } from "./entities.js";

export interface LeaderboardRepository {
  topByMinutes(period: LeaderboardPeriod, limit: number): Promise<LeaderboardEntry[]>;
}
