import { handle } from "../../../shared/http/index";
import { requireUser } from "../../auth/require-user";
import { createSessionUseCase } from "../application/create-session";
import { listSessionsUseCase } from "../application/list-sessions";
import { sessionRepository } from "../infrastructure/session.repository";
import { streakRepository } from "../infrastructure/streak.repository";
import { CreateSessionDto } from "./dto";

const create = createSessionUseCase({
  sessions: sessionRepository,
  streaks: streakRepository,
  clock: { now: () => new Date() },
});
const list = listSessionsUseCase(sessionRepository);

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return list(user.id);
  });
}

export function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = CreateSessionDto.parse(await req.json());
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
