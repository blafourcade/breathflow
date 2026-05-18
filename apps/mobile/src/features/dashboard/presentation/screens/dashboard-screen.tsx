import { View } from "react-native";
import { space } from "@breathflow/ui";
import { Card } from "../../../../shared/ui/card.js";
import { StatTile } from "../../../../shared/ui/stat-tile.js";
import { Text } from "../../../../shared/ui/text.js";

export default function DashboardScreen() {
  return (
    <View style={{ flex: 1, padding: space[5], gap: space[5] }}>
      <Text variant="h1">Stats</Text>

      <Card elevated>
        <Text variant="micro" tone="dim">
          STREAK
        </Text>
        <View style={{ height: space[1] }} />
        <Text variant="display">4</Text>
        <Text variant="caption" tone="muted">
          longest 18 days
        </Text>
      </Card>

      <View style={{ flexDirection: "row", gap: space[3] }}>
        <StatTile value="12 min" label="this week" />
        <StatTile value="47" label="all-time sessions" />
      </View>

      <Card>
        <Text variant="micro" tone="dim">
          BOLT TREND
        </Text>
        <Text variant="h1" style={{ marginTop: space[2] }}>
          28 s
        </Text>
        <Text variant="caption" tone="muted">
          moderate · maintain practice
        </Text>
      </Card>

      <Card>
        <Text variant="micro" tone="dim">
          CATEGORIES (LAST 30 D)
        </Text>
        <View style={{ height: space[3] }} />
        {[
          { name: "Calm", pct: 64 },
          { name: "Focus", pct: 22 },
          { name: "Sleep", pct: 9 },
          { name: "Performance", pct: 5 },
        ].map((c) => (
          <View key={c.name} style={{ marginBottom: space[2] }}>
            <Text variant="caption">
              {c.name} · {c.pct}%
            </Text>
            <View
              style={{
                height: 4,
                borderRadius: 2,
                backgroundColor: "rgba(122,184,255,0.18)",
                marginTop: 4,
              }}
            >
              <View
                style={{
                  width: `${c.pct}%`,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: "rgba(122,184,255,0.9)",
                }}
              />
            </View>
          </View>
        ))}
      </Card>
    </View>
  );
}
