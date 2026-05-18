import { z } from "zod";

export const PatternSnapshotDto = z.object({
  id: z.string(),
  name: z.string(),
  inhale: z.number().nonnegative(),
  hold_full: z.number().nonnegative(),
  exhale: z.number().nonnegative(),
  hold_empty: z.number().nonnegative(),
  rounds: z.number().int().positive(),
  category: z.string(),
});

export const CreateSessionDto = z.object({
  patternId: z.string().uuid().nullable().optional(),
  patternSnapshot: PatternSnapshotDto,
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime(),
  durationSec: z.number().int().nonnegative(),
  completedRounds: z.number().int().nonnegative(),
  totalRounds: z.number().int().nonnegative(),
  completedFully: z.boolean(),
  longestHoldSec: z.number().nullable().optional(),
  mood: z.number().int().min(1).max(5).nullable().optional(),
  energy: z.number().int().min(1).max(5).nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
});

export type CreateSessionInput = z.infer<typeof CreateSessionDto>;
