import { z } from "zod";

export const CreatePatternDto = z.object({
  name: z.string().min(1).max(80),
  slug: z
    .string()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "lowercase letters, digits and dashes only"),
  description: z.string().max(500).nullable().optional(),
  inhale: z.number().min(0).max(60),
  hold_full: z.number().min(0).max(180),
  exhale: z.number().min(0).max(60),
  hold_empty: z.number().min(0).max(180),
  rounds: z.number().int().min(1).max(200),
  category: z.string(),
  visibility: z.enum(["private", "friends", "public"]).default("private"),
});

export type CreatePatternInput = z.infer<typeof CreatePatternDto>;
