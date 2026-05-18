import type { LeaderboardEntry, LeaderboardPeriod } from "./entities";

export interface LeaderboardRepository {
  topByMinutes(period: LeaderboardPeriod, limit: number): Promise<LeaderboardEntry[]>;
}
