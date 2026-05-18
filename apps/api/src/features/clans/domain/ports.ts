import type { ClanEntity, ClanMemberRole, NewClan } from "./entities.js";

export interface ClanRepository {
  create(input: NewClan): Promise<ClanEntity>;
  listTop(limit: number): Promise<ClanEntity[]>;
  addMember(clanId: string, userId: string, role: ClanMemberRole): Promise<void>;
}
