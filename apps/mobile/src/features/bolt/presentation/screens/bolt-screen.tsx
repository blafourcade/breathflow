import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { classifyBolt, boltAdvice } from "@breathflow/breath-engine";
import { space } from "@breathflow/ui";
import { Button } from "../../../../shared/ui/button";
import { Text } from "../../../../shared/ui/text";
import { useTheme } from "../../../../shared/ui/theme-provider";
import { useRecordBolt } from "../../../../shared/api/queries";

type Stage = "intro" | "timing" | "result";

export default function BoltScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [stage, setStage] = useState<Stage>("intro");
  const [seconds, setSeconds] = useState(0);
  const startedAt = useRef<number | null>(null);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordMutation = useRecordBolt();

  useEffect(() => () => {
    if (interval.current) clearInterval(interval.current);
  }, []);

  const begin = () => {
    setStage("timing");
    setSeconds(0);
    startedAt.current = Date.now();
    interval.current = setInterval(() => {
      if (startedAt.current) {
        setSeconds((Date.now() - startedAt.current) / 1000);
      }
    }, 50);
  };

  const stop = () => {
    if (interval.current) clearInterval(interval.current);
    if (!startedAt.current) return;
    const final = (Date.now() - startedAt.current) / 1000;
    setSeconds(final);
    setStage("result");
    recordMutation.mutate({ seconds: final, notes: null });
  };

  if (stage === "intro") {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, padding: space[5], gap: space[5], paddingTop: space[12] }}>
        <Text variant="h1">BOLT test</Text>
        <Text variant="body" tone="muted">
          Sit comfortably. Take one normal breath in, then exhale gently. Hold your breath until the first urge to
          breathe. Tap stop at that moment — not later.
        </Text>
        <Text variant="body" tone="muted">
          This is not a max-hold test. Strain invalidates the result.
        </Text>
        <View style={{ flex: 1 }} />
        <Button label="I'm ready" size="lg" fullWidth onPress={begin} />
      </View>
    );
  }

  if (stage === "timing") {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, padding: space[5], alignItems: "center", justifyContent: "center", gap: space[6] }}>
        <Text variant="caption" tone="dim">
          HOLDING
        </Text>
        <Text variant="timer-num">{formatBolt(seconds)}</Text>
        <Text variant="body" tone="muted" align="center">
          Tap stop the moment you feel the first urge to breathe.
        </Text>
        <View style={{ height: space[6] }} />
        <Button label="Stop" variant="danger" size="lg" fullWidth onPress={stop} />
      </View>
    );
  }

  const category = classifyBolt(seconds);
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: space[5], gap: space[5], paddingTop: space[12] }}>
      <Text variant="caption" tone="dim">YOUR BOLT</Text>
      <Text variant="display">{Math.round(seconds)} s</Text>
      <Text variant="h2" tone="accent">{category.replace("_", " ")}</Text>
      <Text variant="body" tone="muted">
        {boltAdvice(category)}
      </Text>
      <View style={{ flex: 1 }} />
      <Button label="Done" size="lg" fullWidth onPress={() => router.back()} />
    </View>
  );
}

function formatBolt(s: number): string {
  return `${Math.floor(s)}.${String(Math.floor((s % 1) * 10))}`;
}
