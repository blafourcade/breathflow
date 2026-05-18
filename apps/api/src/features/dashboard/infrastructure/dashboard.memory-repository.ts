import type { DashboardStats } from "../domain/entities";
import type { DashboardRepository } from "../domain/ports";
import { _memoryStore } from "../../sessions/infrastructure/session.memory-repository";

export const memoryDashboardRepository: DashboardRepository = {
  async computeFor(userId): Promise<DashboardStats> {
    const { sessions, streaks } = _memoryStore();
    const mine = sessions.filter((s) => s.userId === userId);
    const totalSec = mine.reduce((s, x) => s + x.durationSec, 0);
    const longestHold = mine.reduce<number | null>(
      (m, x) => (x.longestHoldSec != null && (m == null || x.longestHoldSec > m) ? x.longestHoldSec : m),
      null,
    );
    const last = mine.reduce<Date | null>(
      (m, x) => (m == null || x.startedAt > m ? x.startedAt : m),
      null,
    );
    const streak = streaks.get(userId);
    const since = Date.now() - 7 * 86_400_000;
    const byDay = new Map<string, number>();
    for (const s of mine) {
      if (s.startedAt.getTime() < since) continue;
      const day = s.startedAt.toISOString().slice(0, 10);
      byDay.set(day, (byDay.get(day) ?? 0) + s.durationSec);
    }
    return {
      totalSessions: mine.length,
      totalMinutes: Math.round(totalSec / 60),
      currentStreak: streak?.current ?? 0,
      longestStreak: streak?.longest ?? 0,
      averageBolt: null,
      longestHoldSec: longestHold,
      lastSessionAt: last?.toISOString() ?? null,
      last7Days: Array.from(byDay.entries()).map(([date, secs]) => ({
        date,
        minutes: Math.round(secs / 60),
      })),
    };
  },
};
