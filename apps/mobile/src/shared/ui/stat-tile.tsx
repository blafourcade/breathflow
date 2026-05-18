import { View } from "react-native";
import { space } from "@breathflow/ui";
import { Card } from "./card.js";
import { Text } from "./text.js";

interface Props {
  value: string;
  label: string;
  hint?: string;
}

export function StatTile({ value, label, hint }: Props) {
  return (
    <Card style={{ flex: 1 }}>
      <Text variant="micro" tone="dim">
        {label.toUpperCase()}
      </Text>
      <View style={{ height: space[1] }} />
      <Text variant="h1">{value}</Text>
      {hint ? (
        <Text variant="caption" tone="muted" style={{ marginTop: space[1] }}>
          {hint}
        </Text>
      ) : null}
    </Card>
  );
}
