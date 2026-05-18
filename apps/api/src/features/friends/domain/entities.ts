export type FriendStatus = "pending" | "accepted" | "blocked";

export interface FriendEdge {
  userId: string;
  friendId: string;
  status: FriendStatus;
  createdAt: Date;
}
