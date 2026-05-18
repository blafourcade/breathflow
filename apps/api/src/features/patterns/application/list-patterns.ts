import type { PatternEntity } from "../domain/entities";
import type { PatternRepository } from "../domain/ports";

export function listPatternsUseCase(repo: PatternRepository) {
  return (userId: string): Promise<PatternEntity[]> => repo.listVisibleTo(userId);
}
