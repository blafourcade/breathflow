import { desc } from "drizzle-orm";
import { db } from "../../../shared/db/client.js";
import { clanMembers, clans } from "../../../shared/db/schema.js";
import type {
  ClanEntity,
  ClanMemberRole,
  ClanVisibility,
  NewClan,
} from "../domain/entities.js";
import type { ClanRepository } from "../domain/ports.js";

export const clanRepository: ClanRepository = {
  async create(input: NewClan): Promise<ClanEntity> {
    const [row] = await db
      .insert(clans)
      .values({
        name: input.name,
        slug: input.slug,
        description: input.description,
        ownerId: input.ownerId,
        visibility: input.visibility,
      })
      .returning();
    if (!row) throw new Error("Insert returned no row");
    return toEntity(row);
  },
  async listTop(limit: number): Promise<ClanEntity[]> {
    const rows = await db
      .select()
      .from(clans)
      .orderBy(desc(clans.memberCount))
      .limit(limit);
    return rows.map(toEntity);
  },
  async addMember(clanId, userId, role: ClanMemberRole): Promise<void> {
    await db
      .insert(clanMembers)
      .values({ clanId, userId, role })
      .onConflictDoNothing();
  },
};

function toEntity(row: typeof clans.$inferSelect): ClanEntity {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    iconUrl: row.iconUrl,
    ownerId: row.ownerId,
    memberCount: row.memberCount,
    visibility: row.visibility as ClanVisibility,
    createdAt: row.createdAt,
  };
}
