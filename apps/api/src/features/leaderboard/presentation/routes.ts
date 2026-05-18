import { handle } from "../../../shared/http/index";
import { getLeaderboardUseCase } from "../application/use-cases";
import { leaderboardRepository } from "../infrastructure/leaderboard.repository";
import type { LeaderboardPeriod } from "../domain/entities";

const get = getLeaderboardUseCase(leaderboardRepository);

export function GET(req: Request) {
  return handle(async () => {
    const url = new URL(req.url);
    const period = (url.searchParams.get("period") ?? "week") as LeaderboardPeriod;
    return get(period);
  });
}
