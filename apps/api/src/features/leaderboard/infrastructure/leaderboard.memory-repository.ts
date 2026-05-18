import type { LeaderboardEntry, LeaderboardPeriod } from "../domain/entities";
import type { LeaderboardRepository } from "../domain/ports";

const SEED: LeaderboardEntry[] = [
  { userId: "u-1", username: "b.deep", avatarUrl: null, scoreSeconds: 29520, rank: 1 },
  { userId: "u-2", username: "aria", avatarUrl: null, scoreSeconds: 25440, rank: 2 },
  { userId: "u-3", username: "pneuma", avatarUrl: null, scoreSeconds: 24660, rank: 3 },
  { userId: "u-4", username: "jules.calm", avatarUrl: null, scoreSeconds: 2040, rank: 4 },
];

export const memoryLeaderboardRepository: LeaderboardRepository = {
  async topByMinutes(_period: LeaderboardPeriod, limit: number) {
    return SEED.slice(0, limit);
  },
};
