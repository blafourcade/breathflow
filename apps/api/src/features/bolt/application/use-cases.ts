import type { BoltEntity, NewBolt } from "../domain/entities.js";
import type { BoltRepository } from "../domain/ports.js";

export function recordBoltUseCase(repo: BoltRepository) {
  return (input: NewBolt): Promise<BoltEntity> => repo.create(input);
}

export function listBoltUseCase(repo: BoltRepository) {
  return (userId: string, limit = 50): Promise<BoltEntity[]> =>
    repo.listForUser(userId, limit);
}
