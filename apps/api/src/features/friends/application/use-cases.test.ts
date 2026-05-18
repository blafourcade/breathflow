import { describe, expect, it } from "vitest";
import {
  listFriendsUseCase,
  sendFriendRequestUseCase,
} from "./use-cases";
import type { FriendRepository, UserDirectory } from "../domain/ports";
import type { FriendEdge } from "../domain/entities";
import { NotFoundError, ValidationError } from "../../../shared/http/index";

function makeRepos() {
  const edges: FriendEdge[] = [];
  const users = new Map<string, { id: string }>([
    ["alice", { id: "u-alice" }],
    ["bob", { id: "u-bob" }],
  ]);
  const friends: FriendRepository = {
    async listForUser(userId) {
      return edges.filter((e) => e.userId === userId || e.friendId === userId);
    },
    async upsert(userId, friendId, status) {
      const edge = { userId, friendId, status, createdAt: new Date() };
      edges.push(edge);
      return edge;
    },
    async setStatus() {},
  };
  const usersDir: UserDirectory = {
    async findByUsername(u) {
      return users.get(u) ?? null;
    },
  };
  return { friends, users: usersDir, edges };
}

describe("sendFriendRequestUseCase", () => {
  it("creates a pending edge for an existing user", async () => {
    const { friends, users, edges } = makeRepos();
    const run = sendFriendRequestUseCase({ friends, users });
    await run("u-alice", "bob");
    expect(edges).toHaveLength(1);
    expect(edges[0]?.status).toBe("pending");
  });

  it("rejects unknown usernames", async () => {
    const { friends, users } = makeRepos();
    const run = sendFriendRequestUseCase({ friends, users });
    await expect(run("u-alice", "ghost")).rejects.toBeInstanceOf(NotFoundError);
  });

  it("rejects self-requests", async () => {
    const { friends, users } = makeRepos();
    const run = sendFriendRequestUseCase({ friends, users });
    await expect(run("u-alice", "alice")).rejects.toBeInstanceOf(ValidationError);
  });
});

describe("listFriendsUseCase", () => {
  it("returns edges involving the user from either side", async () => {
    const { friends } = makeRepos();
    await friends.upsert("u-alice", "u-bob", "accepted");
    await friends.upsert("u-carol", "u-alice", "pending");
    const list = listFriendsUseCase(friends);
    const out = await list("u-alice");
    expect(out).toHaveLength(2);
  });
});
