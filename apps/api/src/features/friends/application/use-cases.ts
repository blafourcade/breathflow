import { NotFoundError, ValidationError } from "../../../shared/http/index";
import type { FriendEdge } from "../domain/entities";
import type { FriendRepository, UserDirectory } from "../domain/ports";

export interface FriendDeps {
  friends: FriendRepository;
  users: UserDirectory;
}

export function sendFriendRequestUseCase({ friends, users }: FriendDeps) {
  return async (userId: string, username: string): Promise<FriendEdge> => {
    const target = await users.findByUsername(username);
    if (!target) throw new NotFoundError("User not found");
    if (target.id === userId) throw new ValidationError("Cannot add yourself");
    return friends.upsert(userId, target.id, "pending");
  };
}

export function listFriendsUseCase(repo: FriendRepository) {
  return (userId: string): Promise<FriendEdge[]> => repo.listForUser(userId);
}

export function acceptFriendUseCase(repo: FriendRepository) {
  return (userId: string, friendId: string): Promise<void> =>
    repo.setStatus(friendId, userId, "accepted");
}
