export type LeaderboardPeriod = "week" | "month" | "all";

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarUrl: string | null;
  scoreSeconds: number;
  rank: number;
}
