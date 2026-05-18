import { useState } from "react";
import { Pressable, View } from "react-native";
import { space } from "@breathflow/ui";
import { Button } from "../../../../shared/ui/button";
import { Text } from "../../../../shared/ui/text";
import { useTheme } from "../../../../shared/ui/theme-provider";

interface Props {
  patternName: string;
  contraindications: string[];
  onAcknowledge: () => void;
  onCancel: () => void;
}

export function SafetyInterstitial({
  patternName,
  contraindications,
  onAcknowledge,
  onCancel,
}: Props) {
  const theme = useTheme();
  const [ack, setAck] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.bg,
        padding: space[5],
        paddingTop: space[12],
        gap: space[5],
      }}
    >
      <Text variant="display" tone="danger">⚠</Text>
      <Text variant="h1">Before you start {patternName}.</Text>
      <Text variant="body" tone="muted">
        Never practise in or near water, while driving, or while operating machinery.
      </Text>
      <View style={{ gap: space[2] }}>
        <Text variant="bodyBold">Skip this protocol if you have:</Text>
        {contraindications.map((c, i) => (
          <Text key={i} variant="body" tone="muted">
            ·  {c}
          </Text>
        ))}
      </View>
      <Text variant="caption" tone="dim">
        BreathFlow is not medical advice. When in doubt, talk to a doctor.
      </Text>

      <View style={{ flex: 1 }} />

      <Pressable
        onPress={() => setAck(!ack)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: ack }}
        style={{ flexDirection: "row", alignItems: "center", gap: space[3] }}
      >
        <View
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: ack ? theme.accent : theme.border,
            backgroundColor: ack ? theme.accent : "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ack ? <Text variant="micro" style={{ color: "#070A14" }}>✓</Text> : null}
        </View>
        <Text variant="body">I understand.</Text>
      </Pressable>

      <Button
        label="Start anyway"
        variant="danger"
        size="lg"
        disabled={!ack}
        onPress={onAcknowledge}
        fullWidth
      />
      <Pressable onPress={onCancel} accessibilityRole="button">
        <Text variant="caption" tone="muted" align="center">
          not now
        </Text>
      </Pressable>
    </View>
  );
}
