import { and, desc, eq, gte, sql as drSql } from "drizzle-orm";
import { db } from "../../../shared/db/client.js";
import {
  boltMeasurements,
  sessions,
  streaks,
} from "../../../shared/db/schema.js";
import type { DashboardStats } from "../domain/entities.js";
import type { DashboardRepository } from "../domain/ports.js";

const SEVEN_DAYS_MS = 7 * 86_400_000;

export const dashboardRepository: DashboardRepository = {
  async computeFor(userId: string): Promise<DashboardStats> {
    const since = new Date(Date.now() - SEVEN_DAYS_MS);

    const [stats] = await db
      .select({
        totalSessions: drSql<number>`count(*)::int`,
        totalSeconds: drSql<number>`coalesce(sum(${sessions.durationSec}),0)::int`,
        longestHold: drSql<number | null>`max(${sessions.longestHoldSec})`,
        lastSessionAt: drSql<string | null>`max(${sessions.startedAt})`,
      })
      .from(sessions)
      .where(eq(sessions.userId, userId));

    const streak = await db.query.streaks.findFirst({
      where: eq(streaks.userId, userId),
    });

    const recent = await db
      .select({
        day: drSql<string>`to_char(${sessions.startedAt}, 'YYYY-MM-DD')`,
        seconds: drSql<number>`sum(${sessions.durationSec})::int`,
      })
      .from(sessions)
      .where(and(eq(sessions.userId, userId), gte(sessions.startedAt, since)))
      .groupBy(drSql`to_char(${sessions.startedAt}, 'YYYY-MM-DD')`);

    const bolts = await db
      .select()
      .from(boltMeasurements)
      .where(eq(boltMeasurements.userId, userId))
      .orderBy(desc(boltMeasurements.recordedAt))
      .limit(10);

    const avgBolt =
      bolts.length === 0
        ? null
        : bolts.reduce((s, b) => s + b.seconds, 0) / bolts.length;

    return {
      totalSessions: stats?.totalSessions ?? 0,
      totalMinutes: Math.round((stats?.totalSeconds ?? 0) / 60),
      currentStreak: streak?.current ?? 0,
      longestStreak: streak?.longest ?? 0,
      averageBolt: avgBolt,
      longestHoldSec: stats?.longestHold ?? null,
      lastSessionAt: stats?.lastSessionAt ?? null,
      last7Days: recent.map((d) => ({
        date: d.day,
        minutes: Math.round(d.seconds / 60),
      })),
    };
  },
};
