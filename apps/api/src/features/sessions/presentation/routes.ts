import { handle } from "../../../shared/http/index";
import { requireUser } from "../../auth/require-user";
import { createSessionUseCase } from "../application/create-session";
import { listSessionsUseCase } from "../application/list-sessions";
import {
  getSessionRepository,
  getStreakRepository,
} from "../infrastructure/index";
import { CreateSessionDto } from "./dto";

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return listSessionsUseCase(getSessionRepository())(user.id);
  });
}

export function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = CreateSessionDto.parse(await req.json());
    const create = createSessionUseCase({
      sessions: getSessionRepository(),
      streaks: getStreakRepository(),
      clock: { now: () => new Date() },
    });
    return create({
      userId: user.id,
      patternId: body.patternId ?? null,
      patternSnapshot: body.patternSnapshot,
      startedAt: new Date(body.startedAt),
      endedAt: new Date(body.endedAt),
      durationSec: body.durationSec,
      completedRounds: body.completedRounds,
      totalRounds: body.totalRounds,
      completedFully: body.completedFully,
      longestHoldSec: body.longestHoldSec ?? null,
      mood: body.mood ?? null,
      energy: body.energy ?? null,
      notes: body.notes ?? null,
    });
  });
}
