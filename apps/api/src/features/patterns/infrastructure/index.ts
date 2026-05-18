import { storageMode } from "../../../shared/config/runtime";
import { memoryPatternRepository } from "./pattern.memory-repository";
import { patternRepository as pgPatternRepository } from "./pattern.repository";

export function getPatternRepository() {
  return storageMode() === "memory" ? memoryPatternRepository : pgPatternRepository;
}
