import { z } from "zod";
import { handle } from "../../../shared/http/index";
import { requireUser } from "../../auth/require-user";
import { listBoltUseCase, recordBoltUseCase } from "../application/use-cases";
import { boltRepository } from "../infrastructure/bolt.repository";

const record = recordBoltUseCase(boltRepository);
const list = listBoltUseCase(boltRepository);

const Body = z.object({
  seconds: z.number().min(0).max(600),
  notes: z.string().max(500).nullable().optional(),
});

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return list(user.id);
  });
}

export function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());
    return record({ userId: user.id, seconds: body.seconds, notes: body.notes ?? null });
  });
}
