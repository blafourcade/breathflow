import { storageMode } from "../../../shared/config/runtime";
import { memoryBoltRepository } from "./bolt.memory-repository";
import { boltRepository as pgBoltRepository } from "./bolt.repository";

export function getBoltRepository() {
  return storageMode() === "memory" ? memoryBoltRepository : pgBoltRepository;
}
