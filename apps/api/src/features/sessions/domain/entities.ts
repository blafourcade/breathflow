export interface BreathPatternSnapshot {
  id: string;
  name: string;
  inhale: number;
  hold_full: number;
  exhale: number;
  hold_empty: number;
  rounds: number;
  category: string;
}

export interface SessionEntity {
  id: string;
  userId: string;
  patternId: string | null;
  patternSnapshot: BreathPatternSnapshot;
  startedAt: Date;
  endedAt: Date;
  durationSec: number;
  completedRounds: number;
  totalRounds: number;
  completedFully: boolean;
  longestHoldSec: number | null;
  mood: number | null;
  energy: number | null;
  notes: string | null;
}

export interface NewSession {
  userId: string;
  patternId: string | null;
  patternSnapshot: BreathPatternSnapshot;
  startedAt: Date;
  endedAt: Date;
  durationSec: number;
  completedRounds: number;
  totalRounds: number;
  completedFully: boolean;
  longestHoldSec: number | null;
  mood: number | null;
  energy: number | null;
  notes: string | null;
}

export interface StreakState {
  userId: string;
  current: number;
  longest: number;
  lastSessionDay: string | null;
}
