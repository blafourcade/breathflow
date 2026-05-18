import type {
  ClanEntity,
  ClanMemberRole,
  ClanVisibility,
  NewClan,
} from "../domain/entities";
import type { ClanRepository } from "../domain/ports";

let counter = 0;
const clans: ClanEntity[] = [
  {
    id: "demo-clan-1",
    name: "Sunrise Crew",
    slug: "sunrise-crew",
    description: "Daily morning practice.",
    iconUrl: null,
    ownerId: "00000000-0000-0000-0000-000000000001",
    memberCount: 87,
    visibility: "open" as ClanVisibility,
    createdAt: new Date(),
  },
];
const members: { clanId: string; userId: string; role: ClanMemberRole }[] = [];

export const memoryClanRepository: ClanRepository = {
  async create(input: NewClan): Promise<ClanEntity> {
    counter += 1;
    const created: ClanEntity = {
      id: `mem-clan-${counter}`,
      name: input.name,
      slug: input.slug,
      description: input.description,
      iconUrl: null,
      ownerId: input.ownerId,
      memberCount: 1,
      visibility: input.visibility,
      createdAt: new Date(),
    };
    clans.push(created);
    return created;
  },
  async listTop(limit) {
    return [...clans].sort((a, b) => b.memberCount - a.memberCount).slice(0, limit);
  },
  async addMember(clanId, userId, role) {
    members.push({ clanId, userId, role });
  },
};
