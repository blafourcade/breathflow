import { storageMode } from "../../../shared/config/runtime";
import { memoryLeaderboardRepository } from "./leaderboard.memory-repository";
import { leaderboardRepository as pgLeaderboardRepository } from "./leaderboard.repository";

export function getLeaderboardRepository() {
  return storageMode() === "memory" ? memoryLeaderboardRepository : pgLeaderboardRepository;
}
