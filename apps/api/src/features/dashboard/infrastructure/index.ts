import { storageMode } from "../../../shared/config/runtime";
import { memoryDashboardRepository } from "./dashboard.memory-repository";
import { dashboardRepository as pgDashboardRepository } from "./dashboard.repository";

export function getDashboardRepository() {
  return storageMode() === "memory" ? memoryDashboardRepository : pgDashboardRepository;
}
