import { desc, eq } from "drizzle-orm";
import { db } from "../../../shared/db/client.js";
import { sessions } from "../../../shared/db/schema.js";
import type { NewSession, SessionEntity } from "../domain/entities.js";
import type { SessionRepository } from "../domain/ports.js";

export const sessionRepository: SessionRepository = {
  async create(input: NewSession): Promise<SessionEntity> {
    const [row] = await db
      .insert(sessions)
      .values({
        userId: input.userId,
        patternId: input.patternId,
        patternSnapshot: input.patternSnapshot,
        startedAt: input.startedAt,
        endedAt: input.endedAt,
        durationSec: input.durationSec,
        completedRounds: input.completedRounds,
        totalRounds: input.totalRounds,
        completedFully: input.completedFully,
        longestHoldSec: input.longestHoldSec,
        mood: input.mood,
        energy: input.energy,
        notes: input.notes,
      })
      .returning();
    if (!row) throw new Error("Insert returned no row");
    return toEntity(row);
  },

  async listForUser(userId: string, limit: number): Promise<SessionEntity[]> {
    const rows = await db
      .select()
      .from(sessions)
      .where(eq(sessions.userId, userId))
      .orderBy(desc(sessions.startedAt))
      .limit(limit);
    return rows.map(toEntity);
  },
};

function toEntity(row: typeof sessions.$inferSelect): SessionEntity {
  return {
    id: row.id,
    userId: row.userId,
    patternId: row.patternId,
    patternSnapshot: row.patternSnapshot as SessionEntity["patternSnapshot"],
    startedAt: row.startedAt,
    endedAt: row.endedAt,
    durationSec: row.durationSec,
    completedRounds: row.completedRounds,
    totalRounds: row.totalRounds,
    completedFully: row.completedFully,
    longestHoldSec: row.longestHoldSec,
    mood: row.mood,
    energy: row.energy,
    notes: row.notes,
  };
}
