import { and, eq, or } from "drizzle-orm";
import { db } from "../../../shared/db/client";
import { friends, users } from "../../../shared/db/schema";
import type { FriendEdge, FriendStatus } from "../domain/entities";
import type { FriendRepository, UserDirectory } from "../domain/ports";

export const friendRepository: FriendRepository = {
  async listForUser(userId: string): Promise<FriendEdge[]> {
    const rows = await db
      .select()
      .from(friends)
      .where(or(eq(friends.userId, userId), eq(friends.friendId, userId)));
    return rows.map((r) => ({
      userId: r.userId,
      friendId: r.friendId,
      status: r.status,
      createdAt: r.createdAt,
    }));
  },
  async upsert(userId, friendId, status): Promise<FriendEdge> {
    const [row] = await db
      .insert(friends)
      .values({ userId, friendId, status })
      .onConflictDoUpdate({
        target: [friends.userId, friends.friendId],
        set: { status },
      })
      .returning();
    if (!row) throw new Error("Upsert returned no row");
    return {
      userId: row.userId,
      friendId: row.friendId,
      status: row.status,
      createdAt: row.createdAt,
    };
  },
  async setStatus(userId, friendId, status: FriendStatus): Promise<void> {
    await db
      .update(friends)
      .set({ status })
      .where(and(eq(friends.userId, userId), eq(friends.friendId, friendId)));
  },
};

export const userDirectory: UserDirectory = {
  async findByUsername(username: string) {
    const row = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    return row ? { id: row.id } : null;
  },
};
