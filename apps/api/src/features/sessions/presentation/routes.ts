import { handle } from "../../../shared/http/index.js";
import { requireUser } from "../../auth/require-user.js";
import { createSessionUseCase } from "../application/create-session.js";
import { listSessionsUseCase } from "../application/list-sessions.js";
import { sessionRepository } from "../infrastructure/session.repository.js";
import { streakRepository } from "../infrastructure/streak.repository.js";
import { CreateSessionDto } from "./dto.js";

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
