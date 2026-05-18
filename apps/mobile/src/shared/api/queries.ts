import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./http";
import type {
  DashboardStats,
  Session,
  LeaderboardEntry,
  Bolt,
} from "@breathflow/types";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => api.get<DashboardStats>("/api/dashboard"),
  });
}

export function useLeaderboard(period: "week" | "month" | "all" = "week") {
  return useQuery({
    queryKey: ["leaderboard", period],
    queryFn: () => api.get<LeaderboardEntry[]>(`/api/leaderboard?period=${period}`),
  });
}

export function useSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: () => api.get<Session[]>("/api/sessions"),
  });
}

export function useBolt() {
  return useQuery({
    queryKey: ["bolt"],
    queryFn: () => api.get<Bolt[]>("/api/bolt"),
  });
}

export interface CreateSessionInput {
  patternId?: string | null;
  patternSnapshot: {
    id: string;
    name: string;
    inhale: number;
    hold_full: number;
    exhale: number;
    hold_empty: number;
    rounds: number;
    category: string;
  };
  startedAt: string;
  endedAt: string;
  durationSec: number;
  completedRounds: number;
  totalRounds: number;
  completedFully: boolean;
  longestHoldSec?: number | null;
  mood?: number | null;
  energy?: number | null;
  notes?: string | null;
}

export function useCreateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateSessionInput) => api.post<Session>("/api/sessions", input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useRecordBolt() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { seconds: number; notes?: string | null }) =>
      api.post<Bolt>("/api/bolt", input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bolt"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
