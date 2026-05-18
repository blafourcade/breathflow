import type { DashboardStats } from "../domain/entities";
import type { DashboardRepository } from "../domain/ports";

export function getDashboardUseCase(repo: DashboardRepository) {
  return (userId: string): Promise<DashboardStats> => repo.computeFor(userId);
}
