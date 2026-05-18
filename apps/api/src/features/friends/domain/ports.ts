import type { FriendEdge, FriendStatus } from "./entities.js";

export interface FriendRepository {
  listForUser(userId: string): Promise<FriendEdge[]>;
  upsert(userId: string, friendId: string, status: FriendStatus): Promise<FriendEdge>;
  setStatus(userId: string, friendId: string, status: FriendStatus): Promise<void>;
}

export interface UserDirectory {
  findByUsername(username: string): Promise<{ id: string } | null>;
}
