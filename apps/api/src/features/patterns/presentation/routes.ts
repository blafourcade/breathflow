import { handle } from "../../../shared/http/index.js";
import { requireUser } from "../../auth/require-user.js";
import { createPatternUseCase } from "../application/create-pattern.js";
import { listPatternsUseCase } from "../application/list-patterns.js";
import { patternRepository } from "../infrastructure/pattern.repository.js";
import { CreatePatternDto } from "./dto.js";

const create = createPatternUseCase(patternRepository);
const list = listPatternsUseCase(patternRepository);

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return list(user.id);
  });
}

export function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = CreatePatternDto.parse(await req.json());
    return create({
      ownerId: user.id,
      name: body.name,
      slug: body.slug,
      description: body.description ?? null,
      inhaleSec: body.inhale,
      holdFullSec: body.hold_full,
      exhaleSec: body.exhale,
      holdEmptySec: body.hold_empty,
      rounds: body.rounds,
      category: body.category,
      visibility: body.visibility,
    });
  });
}
