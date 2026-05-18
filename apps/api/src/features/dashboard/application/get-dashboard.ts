import type { DashboardStats } from "../domain/entities.js";
import type { DashboardRepository } from "../domain/ports.js";

export function getDashboardUseCase(repo: DashboardRepository) {
  return (userId: string): Promise<DashboardStats> => repo.computeFor(userId);
}
