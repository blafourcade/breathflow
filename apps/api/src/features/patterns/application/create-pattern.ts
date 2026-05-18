import type { NewPattern, PatternEntity } from "../domain/entities";
import type { PatternRepository } from "../domain/ports";

export function createPatternUseCase(repo: PatternRepository) {
  return (input: NewPattern): Promise<PatternEntity> =>
    repo.create(input, generateShareCode());
}

function generateShareCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}
