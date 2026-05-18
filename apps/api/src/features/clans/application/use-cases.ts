import type { ClanEntity, NewClan } from "../domain/entities";
import type { ClanRepository } from "../domain/ports";

export function createClanUseCase(repo: ClanRepository) {
  return async (input: NewClan): Promise<ClanEntity> => {
    const clan = await repo.create(input);
    await repo.addMember(clan.id, input.ownerId, "owner");
    return clan;
  };
}

export function listClansUseCase(repo: ClanRepository) {
  return (limit = 50): Promise<ClanEntity[]> => repo.listTop(limit);
}
