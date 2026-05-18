import { useMemo, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { space } from "@breathflow/ui";
import { Button } from "../../../../shared/ui/button";
import { Card } from "../../../../shared/ui/card";
import { Text } from "../../../../shared/ui/text";
import { useTheme } from "../../../../shared/ui/theme-provider";

interface Phase {
  inhale: number;
  hold_full: number;
  exhale: number;
  hold_empty: number;
  rounds: number;
}

const STEP = 0.5;
const MAX_PHASE = 20;
const MAX_HOLD = 30;
const MAX_ROUNDS = 30;

export default function BuilderScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [phases, setPhases] = useState<Phase>({
    inhale: 4,
    hold_full: 4,
    exhale: 4,
    hold_empty: 4,
    rounds: 10,
  });
  const [name, setName] = useState("My Pattern");

  const totalSec = useMemo(
    () => (phases.inhale + phases.hold_full + phases.exhale + phases.hold_empty) * phases.rounds,
    [phases],
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg, padding: space[5], gap: space[4], paddingTop: space[12] }}>
      <Text variant="h1">Builder</Text>
      <Text variant="caption" tone="muted">
        Total session ≈ {Math.floor(totalSec / 60)} min {Math.round(totalSec % 60)} s
      </Text>

      <Field
        label="Inhale"
        value={phases.inhale}
        max={MAX_PHASE}
        onChange={(v) => setPhases({ ...phases, inhale: v })}
      />
      <Field
        label="Hold (full)"
        value={phases.hold_full}
        max={MAX_HOLD}
        onChange={(v) => setPhases({ ...phases, hold_full: v })}
      />
      <Field
        label="Exhale"
        value={phases.exhale}
        max={MAX_PHASE}
        onChange={(v) => setPhases({ ...phases, exhale: v })}
      />
      <Field
        label="Hold (empty)"
        value={phases.hold_empty}
        max={MAX_HOLD}
        onChange={(v) => setPhases({ ...phases, hold_empty: v })}
      />
      <Field
        label="Rounds"
        value={phases.rounds}
        max={MAX_ROUNDS}
        onChange={(v) => setPhases({ ...phases, rounds: v })}
        integer
      />

      <View style={{ flex: 1 }} />
      <Button
        label="Save & start"
        size="lg"
        fullWidth
        onPress={() => router.back()}
      />
    </View>
  );
}

function Field({
  label,
  value,
  max,
  integer,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  integer?: boolean;
  onChange: (v: number) => void;
}) {
  const step = integer ? 1 : STEP;
  const dec = () => onChange(Math.max(0, Math.round((value - step) * 10) / 10));
  const inc = () => onChange(Math.min(max, Math.round((value + step) * 10) / 10));
  return (
    <Card>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text variant="bodyBold">{label}</Text>
        <Text variant="h3">{integer ? value : value.toFixed(1)} {integer ? "" : "s"}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: space[2], marginTop: space[3] }}>
        <Button label="−" size="sm" variant="secondary" onPress={dec} />
        <Button label="+" size="sm" variant="secondary" onPress={inc} />
      </View>
    </Card>
  );
}
