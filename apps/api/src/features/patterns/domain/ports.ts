import type { NewPattern, PatternEntity } from "./entities.js";

export interface PatternRepository {
  create(input: NewPattern, shareCode: string): Promise<PatternEntity>;
  listVisibleTo(userId: string): Promise<PatternEntity[]>;
  findByShareCode(code: string): Promise<PatternEntity | null>;
}
