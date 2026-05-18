export interface DayMinutes {
  date: string;
  minutes: number;
}

export interface DashboardStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  averageBolt: number | null;
  longestHoldSec: number | null;
  lastSessionAt: string | null;
  last7Days: DayMinutes[];
}
