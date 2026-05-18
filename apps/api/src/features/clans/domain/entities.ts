export type ClanVisibility = "open" | "request" | "invite";
export type ClanMemberRole = "owner" | "admin" | "member";

export interface ClanEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconUrl: string | null;
  ownerId: string;
  memberCount: number;
  visibility: ClanVisibility;
  createdAt: Date;
}

export interface NewClan {
  name: string;
  slug: string;
  description: string;
  ownerId: string;
  visibility: ClanVisibility;
}
