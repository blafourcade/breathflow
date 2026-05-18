import { View } from "react-native";
import { useRouter } from "expo-router";
import { PRESETS } from "@breathflow/breath-engine";
import { space } from "@breathflow/ui";
import { Button } from "../../../../shared/ui/button.js";
import { Card } from "../../../../shared/ui/card.js";
import { StatTile } from "../../../../shared/ui/stat-tile.js";
import { Text } from "../../../../shared/ui/text.js";

export default function HomeScreen() {
  const router = useRouter();
  const featured = PRESETS[0]!;
  const tonight = PRESETS.filter((p) => p.category === "sleep" || p.category === "calm").slice(0, 3);

  return (
    <View style={{ flex: 1, padding: space[5], gap: space[6] }}>
      <Text variant="h2">Good evening</Text>

      <Card elevated>
        <Text variant="micro" tone="dim">
          PICK UP WHERE YOU LEFT
        </Text>
        <View style={{ height: space[1] }} />
        <Text variant="h2">{featured.name}</Text>
        <Text variant="caption" tone="muted">
          {featured.rounds} rounds · {featured.category}
        </Text>
        <View style={{ height: space[4] }} />
        <Button
          label="Resume"
          onPress={() => router.push(`/session?patternId=${featured.id}`)}
        />
      </Card>

      <View>
        <Text variant="micro" tone="dim" style={{ marginBottom: space[3] }}>
          FOR TONIGHT
        </Text>
        <View style={{ gap: space[2] }}>
          {tonight.map((p) => (
            <Card key={p.id}>
              <Text variant="bodyBold">{p.name}</Text>
              <Text variant="caption" tone="muted">
                {p.rounds} rounds
              </Text>
            </Card>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: space[3] }}>
        <StatTile value="12 min" label="this week" />
        <StatTile value="4" label="day streak" hint="longest 18" />
      </View>
    </View>
  );
}
