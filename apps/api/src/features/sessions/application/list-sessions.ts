import type { SessionEntity } from "../domain/entities";
import type { SessionRepository } from "../domain/ports";

const DEFAULT_LIMIT = 50;

export function listSessionsUseCase(repo: SessionRepository) {
  return (userId: string, limit = DEFAULT_LIMIT): Promise<SessionEntity[]> =>
    repo.listForUser(userId, limit);
}
