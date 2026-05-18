import { storageMode } from "../../../shared/config/runtime";
import { memoryClanRepository } from "./clan.memory-repository";
import { clanRepository as pgClanRepository } from "./clan.repository";

export function getClanRepository() {
  return storageMode() === "memory" ? memoryClanRepository : pgClanRepository;
}
