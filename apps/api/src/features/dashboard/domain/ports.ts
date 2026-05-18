import type { DashboardStats } from "./entities";

export interface DashboardRepository {
  computeFor(userId: string): Promise<DashboardStats>;
}
