export interface User {
  id: string;
  clerkId: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  patternId: string;
  patternSnapshot: BreathPatternSnapshot;
  startedAt: string;
  endedAt: string;
  durationSec: number;
  completedRounds: number;
  totalRounds: number;
  completedFully: boolean;
  longestHoldSec: number | null;
  mood: number | null;
  energy: number | null;
  notes: string | null;
}

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

export interface CustomPattern {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string | null;
  inhale: number;
  hold_full: number;
  exhale: number;
  hold_empty: number;
  rounds: number;
  category: string;
  visibility: "private" | "friends" | "public";
  likes: number;
  shareCode: string | null;
  createdAt: string;
}

export interface Bolt {
  id: string;
  userId: string;
  seconds: number;
  recordedAt: string;
  notes: string | null;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: "pending" | "accepted" | "blocked";
  createdAt: string;
}

export interface Clan {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconUrl: string | null;
  ownerId: string;
  memberCount: number;
  visibility: "open" | "request" | "invite";
  createdAt: string;
}

export interface ClanMember {
  clanId: string;
  userId: string;
  role: "owner" | "admin" | "member";
  joinedAt: string;
}

export interface DashboardStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  averageBolt: number | null;
  longestHoldSec: number | null;
  lastSessionAt: string | null;
  byCategory: Record<string, number>;
  last7Days: { date: string; minutes: number }[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatarUrl: string | null;
  score: number;
  rank: number;
}
