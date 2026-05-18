import { handle } from "../../../shared/http/index.js";
import { getLeaderboardUseCase } from "../application/use-cases.js";
import { leaderboardRepository } from "../infrastructure/leaderboard.repository.js";
import type { LeaderboardPeriod } from "../domain/entities.js";

const get = getLeaderboardUseCase(leaderboardRepository);

export function GET(req: Request) {
  return handle(async () => {
    const url = new URL(req.url);
    const period = (url.searchParams.get("period") ?? "week") as LeaderboardPeriod;
    return get(period);
  });
}
