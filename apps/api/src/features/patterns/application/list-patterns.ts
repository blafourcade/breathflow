import type { PatternEntity } from "../domain/entities.js";
import type { PatternRepository } from "../domain/ports.js";

export function listPatternsUseCase(repo: PatternRepository) {
  return (userId: string): Promise<PatternEntity[]> => repo.listVisibleTo(userId);
}
