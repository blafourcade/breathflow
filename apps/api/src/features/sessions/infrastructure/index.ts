import { storageMode } from "../../../shared/config/runtime";
import {
  memorySessionRepository,
  memoryStreakRepository,
} from "./session.memory-repository";
import { sessionRepository as pgSessionRepository } from "./session.repository";
import { streakRepository as pgStreakRepository } from "./streak.repository";

export function getSessionRepository() {
  return storageMode() === "memory" ? memorySessionRepository : pgSessionRepository;
}
export function getStreakRepository() {
  return storageMode() === "memory" ? memoryStreakRepository : pgStreakRepository;
}
