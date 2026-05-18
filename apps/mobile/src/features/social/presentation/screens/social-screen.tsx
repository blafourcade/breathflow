import { View } from "react-native";
import { space } from "@breathflow/ui";
import { Card } from "../../../../shared/ui/card.js";
import { Text } from "../../../../shared/ui/text.js";

export default function SocialScreen() {
  return (
    <View style={{ flex: 1, padding: space[5], gap: space[5] }}>
      <Text variant="h1">Social</Text>
      <Card>
        <Text variant="bodyBold">Friends activity</Text>
        <Text variant="caption" tone="muted" style={{ marginTop: space[1] }}>
          Add friends to see their practice here.
        </Text>
      </Card>
      <Card>
        <Text variant="bodyBold">Clans</Text>
        <Text variant="caption" tone="muted" style={{ marginTop: space[1] }}>
          Join or create a clan to practise together.
        </Text>
      </Card>
      <Card>
        <Text variant="bodyBold">Leaderboard</Text>
        <Text variant="caption" tone="muted" style={{ marginTop: space[1] }}>
          Top minutes practised this week.
        </Text>
      </Card>
    </View>
  );
}
