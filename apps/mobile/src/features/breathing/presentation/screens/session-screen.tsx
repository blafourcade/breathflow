import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useKeepAwake } from "expo-keep-awake";
import { getPreset, type Phase } from "@breathflow/breath-engine";
import { space } from "@breathflow/ui";
import { useTheme } from "../../../../shared/ui/theme-provider.js";
import { Text } from "../../../../shared/ui/text.js";
import { PhaseRing } from "../components/phase-ring.js";
import { ProgressDots } from "../components/progress-dots.js";
import { useSession } from "../../application/use-session.js";

const PHASE_LABEL: Record<Phase, string> = {
  inhale: "Inhale",
  hold_full: "Hold",
  exhale: "Exhale",
  hold_empty: "Empty",
};

export default function SessionScreen() {
  useKeepAwake();
  const router = useRouter();
  const theme = useTheme();
  const params = useLocalSearchParams<{ patternId?: string }>();
  const pattern = getPreset(params.patternId ?? "box-4-4-4-4") ?? getPreset("box-4-4-4-4")!;
  const session = useSession(pattern);

  useEffect(() => {
    session.start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View
        style={{
          paddingTop: space[10],
          paddingHorizontal: space[5],
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text variant="micro" tone="dim">
            ROUND {session.round} / {session.totalRounds}
          </Text>
          <View style={{ height: space[1] }} />
          <ProgressDots total={session.totalRounds} current={session.round - 1} />
        </View>
        <Pressable
          onPress={() => {
            session.end();
            router.back();
          }}
          accessibilityLabel="End session"
          hitSlop={16}
        >
          <Text variant="h3" tone="muted">
            ✕
          </Text>
        </Pressable>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ position: "absolute" }}>
          <PhaseRing phase={session.phase} phaseDurationMs={msFromProgress(session)} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text variant="timer-phase" tone="muted">
            {session.phase ? PHASE_LABEL[session.phase] : "Get ready"}
          </Text>
          <Text variant="timer-num">{formatRemaining(session.remainingMs)}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: space[3],
          paddingHorizontal: space[5],
          paddingBottom: space[10],
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => (session.state === "running" ? session.pause() : session.resume())}
          accessibilityLabel="Pause or resume"
          hitSlop={16}
        >
          <Text variant="h3" tone="muted">
            {session.state === "running" ? "⏸" : "▶"}
          </Text>
        </Pressable>
        <Pressable onPress={() => session.skip()} accessibilityLabel="Skip phase" hitSlop={16}>
          <Text variant="h3" tone="muted">
            ⏭
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function formatRemaining(ms: number): string {
  const secs = Math.ceil(ms / 1000);
  return `0:${String(secs).padStart(2, "0")}`;
}

function msFromProgress(session: { remainingMs: number; progress: number }): number {
  if (session.progress <= 0) return 0;
  return Math.round(session.remainingMs / Math.max(0.001, 1 - session.progress));
}
