import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { useRouter } from "expo-router";
import { PRESETS, type BreathPattern } from "@breathflow/breath-engine";
import { space } from "@breathflow/ui";
import { Card } from "../../../../shared/ui/card";
import { Chip } from "../../../../shared/ui/chip";
import { Text } from "../../../../shared/ui/text";
import { Button } from "../../../../shared/ui/button";

const CATEGORIES = ["all", "calm", "focus", "energize", "sleep", "performance", "pranayama"] as const;
type Category = (typeof CATEGORIES)[number];

export default function LibraryScreen() {
  const [filter, setFilter] = useState<Category>("all");
  const router = useRouter();

  const patterns = useMemo<BreathPattern[]>(
    () => (filter === "all" ? PRESETS : PRESETS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <View style={{ flex: 1, padding: space[5], gap: space[5] }}>
      <Text variant="h1">Library</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space[2] }}>
        {CATEGORIES.map((c) => (
          <Chip key={c} label={c} selected={filter === c} onPress={() => setFilter(c)} />
        ))}
      </View>
      <FlatList
        data={patterns}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ gap: space[3], paddingBottom: space[10] }}
        renderItem={({ item }) => (
          <Card>
            <Text variant="h3">{item.name}</Text>
            <Text variant="caption" tone="muted" style={{ marginTop: space[1] }}>
              {item.rounds} rounds · {item.category} · {item.difficulty}
            </Text>
            <Text variant="body" style={{ marginTop: space[2] }}>
              {item.description}
            </Text>
            {item.contraindications.length > 0 ? (
              <Text variant="caption" tone="danger" style={{ marginTop: space[2] }}>
                ⚠ {item.contraindications[0]}
              </Text>
            ) : null}
            <View style={{ height: space[3] }} />
            <Button
              label="Start"
              size="md"
              onPress={() => router.push(`/session?patternId=${item.id}`)}
            />
          </Card>
        )}
      />
    </View>
  );
}
