import { z } from "zod";
import { handle } from "../../../shared/http/index.js";
import { requireUser } from "../../auth/require-user.js";
import { createClanUseCase, listClansUseCase } from "../application/use-cases.js";
import { clanRepository } from "../infrastructure/clan.repository.js";

const create = createClanUseCase(clanRepository);
const list = listClansUseCase(clanRepository);

const Body = z.object({
  name: z.string().min(2).max(40),
  slug: z
    .string()
    .min(2)
    .max(40)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().max(300),
  visibility: z.enum(["open", "request", "invite"]).default("open"),
});

export function GET() {
  return handle(async () => list());
}

export function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());
    return create({
      name: body.name,
      slug: body.slug,
      description: body.description,
      ownerId: user.id,
      visibility: body.visibility,
    });
  });
}
