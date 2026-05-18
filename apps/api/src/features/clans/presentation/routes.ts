import { z } from "zod";
import { handle } from "../../../shared/http/index";
import { requireUser } from "../../auth/require-user";
import { createClanUseCase, listClansUseCase } from "../application/use-cases";
import { getClanRepository } from "../infrastructure/index";

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
  return handle(async () => listClansUseCase(getClanRepository())());
}

export function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());
    return createClanUseCase(getClanRepository())({
      name: body.name,
      slug: body.slug,
      description: body.description,
      ownerId: user.id,
      visibility: body.visibility,
    });
  });
}
