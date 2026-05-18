import { handle } from "../../../shared/http/index";
import { getLeaderboardUseCase } from "../application/use-cases";
import { getLeaderboardRepository } from "../infrastructure/index";
import type { LeaderboardPeriod } from "../domain/entities";

export function GET(req: Request) {
  return handle(async () => {
    const url = new URL(req.url);
    const period = (url.searchParams.get("period") ?? "week") as LeaderboardPeriod;
    return getLeaderboardUseCase(getLeaderboardRepository())(period);
  });
}
