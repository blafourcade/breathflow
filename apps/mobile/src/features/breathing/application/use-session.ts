import { useEffect, useMemo, useRef, useState } from "react";
import {
  BreathEngine,
  type BreathPattern,
  type EngineState,
  type Phase,
  type SessionResult,
  type SessionTick,
} from "@breathflow/breath-engine";

interface UseSessionResult {
  state: EngineState;
  phase: Phase | null;
  round: number;
  totalRounds: number;
  remainingMs: number;
  progress: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  end: () => SessionResult;
  skip: () => void;
}

export function useSession(pattern: BreathPattern): UseSessionResult {
  const [state, setState] = useState<EngineState>("idle");
  const [phase, setPhase] = useState<Phase | null>(null);
  const [round, setRound] = useState(1);
  const [remainingMs, setRemainingMs] = useState(0);
  const [progress, setProgress] = useState(0);
  const engineRef = useRef<BreathEngine | null>(null);

  const engine = useMemo(() => {
    const e = new BreathEngine(pattern, {
      onStateChange: setState,
      onPhaseChange: (p, r) => {
        setPhase(p);
        setRound(r);
      },
      onTick: (t: SessionTick) => {
        setRemainingMs(Math.max(0, t.phaseDurationMs - t.elapsedInPhaseMs));
        setProgress(t.progressInPhase);
      },
    });
    engineRef.current = e;
    return e;
  }, [pattern]);

  useEffect(() => {
    return () => {
      try {
        engineRef.current?.stop();
      } catch {
        // engine already stopped
      }
    };
  }, []);

  return {
    state,
    phase,
    round,
    totalRounds: pattern.rounds,
    remainingMs,
    progress,
    start: () => engine.start(),
    pause: () => engine.pause(),
    resume: () => engine.resume(),
    end: () => engine.stop(),
    skip: () => engine.skipPhase(),
  };
}
