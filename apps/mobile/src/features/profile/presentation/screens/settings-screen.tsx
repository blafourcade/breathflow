import { useState } from "react";
import { Switch, View } from "react-native";
import { space } from "@breathflow/ui";
import { Card } from "../../../../shared/ui/card";
import { Chip } from "../../../../shared/ui/chip";
import { Text } from "../../../../shared/ui/text";

export default function SettingsScreen() {
  const [haptics, setHaptics] = useState(true);
  const [reminder, setReminder] = useState(true);
  const [cue, setCue] = useState<"voice" | "tone" | "silent">("tone");

  return (
    <View style={{ flex: 1, padding: space[5], gap: space[5] }}>
      <Text variant="h1">Settings</Text>

      <Card>
        <Text variant="bodyBold" style={{ marginBottom: space[3] }}>Practice</Text>
        <Row label="Haptics">
          <Switch value={haptics} onValueChange={setHaptics} />
        </Row>
        <Row label="Daily reminder">
          <Switch value={reminder} onValueChange={setReminder} />
        </Row>
        <Row label="Cue style">
          <View style={{ flexDirection: "row", gap: space[2] }}>
            {(["voice", "tone", "silent"] as const).map((c) => (
              <Chip key={c} label={c} selected={cue === c} onPress={() => setCue(c)} />
            ))}
          </View>
        </Row>
      </Card>

      <Card>
        <Text variant="bodyBold">Privacy</Text>
        <Text variant="caption" tone="muted" style={{ marginTop: space[1] }}>
          Friends activity, global leaderboard, data export.
        </Text>
      </Card>

      <Text variant="micro" tone="dim" align="center">
        BreathFlow v0.1.0 · not medical advice
      </Text>
    </View>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View
      style={{
        paddingVertical: space[2],
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text variant="body">{label}</Text>
      {children}
    </View>
  );
}
