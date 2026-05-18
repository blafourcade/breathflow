import type { FriendEdge, FriendStatus } from "../domain/entities";
import type { FriendRepository, UserDirectory } from "../domain/ports";

const edges: FriendEdge[] = [];
const users = new Map<string, { id: string }>([
  ["demo", { id: "00000000-0000-0000-0000-000000000099" }],
]);

export const memoryFriendRepository: FriendRepository = {
  async listForUser(userId) {
    return edges.filter((e) => e.userId === userId || e.friendId === userId);
  },
  async upsert(userId, friendId, status: FriendStatus): Promise<FriendEdge> {
    let edge = edges.find((e) => e.userId === userId && e.friendId === friendId);
    if (!edge) {
      edge = { userId, friendId, status, createdAt: new Date() };
      edges.push(edge);
    } else {
      edge.status = status;
    }
    return edge;
  },
  async setStatus(userId, friendId, status) {
    const edge = edges.find((e) => e.userId === userId && e.friendId === friendId);
    if (edge) edge.status = status;
  },
};

export const memoryUserDirectory: UserDirectory = {
  async findByUsername(username) {
    return users.get(username) ?? null;
  },
};
