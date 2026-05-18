import type { LeaderboardEntry, LeaderboardPeriod } from "../domain/entities.js";
import type { LeaderboardRepository } from "../domain/ports.js";

export function getLeaderboardUseCase(repo: LeaderboardRepository) {
  return (
    period: LeaderboardPeriod = "week",
    limit = 50,
  ): Promise<LeaderboardEntry[]> => repo.topByMinutes(period, limit);
}
