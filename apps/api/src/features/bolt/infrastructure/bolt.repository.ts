import { desc, eq } from "drizzle-orm";
import { db } from "../../../shared/db/client";
import { boltMeasurements } from "../../../shared/db/schema";
import type { BoltEntity, NewBolt } from "../domain/entities";
import type { BoltRepository } from "../domain/ports";

export const boltRepository: BoltRepository = {
  async create(input: NewBolt): Promise<BoltEntity> {
    const [row] = await db
      .insert(boltMeasurements)
      .values({ userId: input.userId, seconds: input.seconds, notes: input.notes })
      .returning();
    if (!row) throw new Error("Insert returned no row");
    return toEntity(row);
  },
  async listForUser(userId: string, limit: number): Promise<BoltEntity[]> {
    const rows = await db
      .select()
      .from(boltMeasurements)
      .where(eq(boltMeasurements.userId, userId))
      .orderBy(desc(boltMeasurements.recordedAt))
      .limit(limit);
    return rows.map(toEntity);
  },
};

function toEntity(row: typeof boltMeasurements.$inferSelect): BoltEntity {
  return {
    id: row.id,
    userId: row.userId,
    seconds: row.seconds,
    recordedAt: row.recordedAt,
    notes: row.notes,
  };
}
