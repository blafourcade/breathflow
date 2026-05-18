import { describe, expect, it } from "vitest";
import { createPatternUseCase } from "./create-pattern";
import { listPatternsUseCase } from "./list-patterns";
import type {
  NewPattern,
  PatternEntity,
} from "../domain/entities";
import type { PatternRepository } from "../domain/ports";

function makeRepo(): { repo: PatternRepository; store: PatternEntity[] } {
  const store: PatternEntity[] = [];
  return {
    store,
    repo: {
      async create(input: NewPattern, shareCode): Promise<PatternEntity> {
        const row: PatternEntity = {
          id: `p-${store.length + 1}`,
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
        store.push(row);
        return row;
      },
      async listVisibleTo(userId) {
        return store.filter((p) => p.ownerId === userId || p.visibility === "public");
      },
      async findByShareCode(code) {
        return store.find((p) => p.shareCode === code) ?? null;
      },
    },
  };
}

const base: NewPattern = {
  ownerId: "u1",
  name: "Box",
  slug: "box",
  description: null,
  inhaleSec: 4,
  holdFullSec: 4,
  exhaleSec: 4,
  holdEmptySec: 4,
  rounds: 5,
  category: "calm",
  visibility: "private",
};

describe("createPatternUseCase", () => {
  it("assigns an 8-char share code", async () => {
    const { repo } = makeRepo();
    const out = await createPatternUseCase(repo)(base);
    expect(out.shareCode).toMatch(/^[A-HJ-NP-Z2-9]{8}$/);
  });

  it("share codes are unique enough across creations", async () => {
    const { repo } = makeRepo();
    const codes = new Set<string>();
    for (let i = 0; i < 50; i++) {
      const row = await createPatternUseCase(repo)({ ...base, slug: `box-${i}` });
      codes.add(row.shareCode!);
    }
    expect(codes.size).toBe(50);
  });

  it("private patterns are not visible to other users", async () => {
    const { repo } = makeRepo();
    await createPatternUseCase(repo)({ ...base, ownerId: "u1", visibility: "private" });
    const visibleToOther = await listPatternsUseCase(repo)("u2");
    expect(visibleToOther).toHaveLength(0);
  });

  it("public patterns are visible to other users", async () => {
    const { repo } = makeRepo();
    await createPatternUseCase(repo)({ ...base, ownerId: "u1", visibility: "public" });
    const visibleToOther = await listPatternsUseCase(repo)("u2");
    expect(visibleToOther).toHaveLength(1);
  });
});
