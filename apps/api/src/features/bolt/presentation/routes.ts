import { z } from "zod";
import { handle } from "../../../shared/http/index";
import { requireUser } from "../../auth/require-user";
import { listBoltUseCase, recordBoltUseCase } from "../application/use-cases";
import { getBoltRepository } from "../infrastructure/index";

const Body = z.object({
  seconds: z.number().min(0).max(600),
  notes: z.string().max(500).nullable().optional(),
});

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return listBoltUseCase(getBoltRepository())(user.id);
  });
}

export function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());
    return recordBoltUseCase(getBoltRepository())({
      userId: user.id,
      seconds: body.seconds,
      notes: body.notes ?? null,
    });
  });
}
