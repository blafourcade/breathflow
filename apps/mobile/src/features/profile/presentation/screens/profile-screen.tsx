import { View } from "react-native";
import { space } from "@breathflow/ui";
import { Card } from "../../../../shared/ui/card";
import { StatTile } from "../../../../shared/ui/stat-tile";
import { Text } from "../../../../shared/ui/text";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, padding: space[5], gap: space[5] }}>
      <View style={{ alignItems: "center", gap: space[2] }}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: "rgba(122,184,255,0.18)",
          }}
        />
        <Text variant="h2">@you</Text>
        <Text variant="caption" tone="muted">
          Member since May 2026
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: space[3] }}>
        <StatTile value="412" label="minutes" />
        <StatTile value="12" label="day streak" />
      </View>

      <Card>
        <Text variant="bodyBold">Settings</Text>
        <Text variant="caption" tone="muted" style={{ marginTop: space[1] }}>
          Cue style, theme, reminders, privacy.
        </Text>
      </Card>
    </View>
  );
}
