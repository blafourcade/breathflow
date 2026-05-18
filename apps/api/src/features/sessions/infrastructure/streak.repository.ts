import { eq } from "drizzle-orm";
import { db } from "../../../shared/db/client.js";
import { streaks } from "../../../shared/db/schema.js";
import type { StreakState } from "../domain/entities.js";
import type { StreakRepository } from "../domain/ports.js";

export const streakRepository: StreakRepository = {
  async findByUserId(userId: string): Promise<StreakState | null> {
    const row = await db.query.streaks.findFirst({
      where: eq(streaks.userId, userId),
    });
    if (!row) return null;
    return {
      userId: row.userId,
      current: row.current,
      longest: row.longest,
      lastSessionDay: row.lastSessionDay,
    };
  },

  async save(state: StreakState): Promise<void> {
    await db
      .insert(streaks)
      .values({
        userId: state.userId,
        current: state.current,
        longest: state.longest,
        lastSessionDay: state.lastSessionDay,
      })
      .onConflictDoUpdate({
        target: streaks.userId,
        set: {
          current: state.current,
          longest: state.longest,
          lastSessionDay: state.lastSessionDay,
          updatedAt: new Date(),
        },
      });
  },
};
