import { desc, eq, gte, sql as drSql } from "drizzle-orm";
import { db } from "../../../shared/db/client";
import { sessions, users } from "../../../shared/db/schema";
import type { LeaderboardEntry, LeaderboardPeriod } from "../domain/entities";
import type { LeaderboardRepository } from "../domain/ports";

const DAY_MS = 86_400_000;

export const leaderboardRepository: LeaderboardRepository = {
  async topByMinutes(period: LeaderboardPeriod, limit: number): Promise<LeaderboardEntry[]> {
    const days = period === "all" ? 36_500 : period === "month" ? 30 : 7;
    const since = new Date(Date.now() - days * DAY_MS);
    const rows = await db
      .select({
        userId: sessions.userId,
        username: users.username,
        avatarUrl: users.avatarUrl,
        score: drSql<number>`coalesce(sum(${sessions.durationSec}),0)::int`,
      })
      .from(sessions)
      .innerJoin(users, eq(users.id, sessions.userId))
      .where(gte(sessions.startedAt, since))
      .groupBy(sessions.userId, users.username, users.avatarUrl)
      .orderBy(desc(drSql`coalesce(sum(${sessions.durationSec}),0)`))
      .limit(limit);
    return rows.map((r, i) => ({
      userId: r.userId,
      username: r.username,
      avatarUrl: r.avatarUrl,
      scoreSeconds: r.score,
      rank: i + 1,
    }));
  },
};
