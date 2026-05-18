import { desc, eq, or } from "drizzle-orm";
import { db } from "../../../shared/db/client.js";
import { patterns } from "../../../shared/db/schema.js";
import type {
  NewPattern,
  PatternEntity,
  Visibility,
} from "../domain/entities.js";
import type { PatternRepository } from "../domain/ports.js";

export const patternRepository: PatternRepository = {
  async create(input: NewPattern, shareCode: string): Promise<PatternEntity> {
    const [row] = await db
      .insert(patterns)
      .values({
        ownerId: input.ownerId,
        name: input.name,
        slug: input.slug,
        description: input.description,
        inhaleSec: input.inhaleSec,
        holdFullSec: input.holdFullSec,
        exhaleSec: input.exhaleSec,
        holdEmptySec: input.holdEmptySec,
        rounds: input.rounds,
        category: input.category,
        visibility: input.visibility,
        shareCode,
      })
      .returning();
    if (!row) throw new Error("Insert returned no row");
    return toEntity(row);
  },

  async listVisibleTo(userId: string): Promise<PatternEntity[]> {
    const rows = await db
      .select()
      .from(patterns)
      .where(or(eq(patterns.ownerId, userId), eq(patterns.visibility, "public")))
      .orderBy(desc(patterns.createdAt));
    return rows.map(toEntity);
  },

  async findByShareCode(code: string): Promise<PatternEntity | null> {
    const row = await db.query.patterns.findFirst({
      where: eq(patterns.shareCode, code),
    });
    return row ? toEntity(row) : null;
  },
};

function toEntity(row: typeof patterns.$inferSelect): PatternEntity {
  return {
    id: row.id,
    ownerId: row.ownerId,
    presetId: row.presetId,
    name: row.name,
    slug: row.slug,
    description: row.description,
    inhaleSec: row.inhaleSec,
    holdFullSec: row.holdFullSec,
    exhaleSec: row.exhaleSec,
    holdEmptySec: row.holdEmptySec,
    rounds: row.rounds,
    category: row.category,
    visibility: row.visibility as Visibility,
    likes: row.likes,
    shareCode: row.shareCode,
    createdAt: row.createdAt,
  };
}
