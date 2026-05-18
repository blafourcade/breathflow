import type { DashboardStats } from "./entities.js";

export interface DashboardRepository {
  computeFor(userId: string): Promise<DashboardStats>;
}
