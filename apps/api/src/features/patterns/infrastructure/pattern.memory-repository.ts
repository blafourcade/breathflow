import type { NewPattern, PatternEntity } from "../domain/entities";
import type { PatternRepository } from "../domain/ports";

let counter = 0;
const patterns: PatternEntity[] = [];

export const memoryPatternRepository: PatternRepository = {
  async create(input: NewPattern, shareCode: string): Promise<PatternEntity> {
    counter += 1;
    const created: PatternEntity = {
      id: `mem-pattern-${counter}`,
      ownerId: input.ownerId,
      presetId: null,
      name: input.name,
      slug: input.slug,
      description: input.description,
      inhaleSec: input.inhaleSec,
      holdFullSec: input.holdFullSec,
      exhaleSec: input.exhaleSec,
      holdEmptySec: input.holdEmptySec,
      rounds: input.rounds,
      category: input.category,
      visibility: input.visibility,
      likes: 0,
      shareCode,
      createdAt: new Date(),
    };
    patterns.push(created);
    return created;
  },
  async listVisibleTo(userId) {
    return patterns
      .filter((p) => p.ownerId === userId || p.visibility === "public")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  async findByShareCode(code) {
    return patterns.find((p) => p.shareCode === code) ?? null;
  },
};
