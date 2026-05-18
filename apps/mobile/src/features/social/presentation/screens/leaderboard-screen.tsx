import { useState } from "react";
import { FlatList, View } from "react-native";
import { space } from "@breathflow/ui";
import { Card } from "../../../../shared/ui/card";
import { Chip } from "../../../../shared/ui/chip";
import { Text } from "../../../../shared/ui/text";
import { useLeaderboard } from "../../../../shared/api/queries";

const PERIODS = ["week", "month", "all"] as const;

export default function LeaderboardScreen() {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("week");
  const { data, isLoading } = useLeaderboard(period);

  return (
    <View style={{ flex: 1, padding: space[5], gap: space[4] }}>
      <Text variant="h1">Leaderboard</Text>
      <View style={{ flexDirection: "row", gap: space[2] }}>
        {PERIODS.map((p) => (
          <Chip key={p} label={p} selected={p === period} onPress={() => setPeriod(p)} />
        ))}
      </View>
      {isLoading ? (
        <Text variant="caption" tone="muted">
          Loading…
        </Text>
      ) : null}
      <FlatList
        data={data ?? []}
        keyExtractor={(e) => e.userId}
        contentContainerStyle={{ gap: space[2], paddingBottom: space[10] }}
        renderItem={({ item }) => (
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text variant="bodyBold">
                #{item.rank} · {item.username}
              </Text>
              <Text variant="bodyBold" tone="accent">
                {Math.round(item.scoreSeconds / 60)} min
              </Text>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
