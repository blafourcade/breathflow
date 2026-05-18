import { Pressable } from "react-native";
import { radius, space } from "@breathflow/ui";
import { Text } from "./text.js";
import { useTheme } from "./theme-provider.js";

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export function Chip({ label, selected, onPress }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={{
        paddingHorizontal: space[4],
        height: 32,
        borderRadius: radius.full,
        backgroundColor: selected ? theme.accent : theme.surfaceElev,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text variant="micro" style={{ color: selected ? "#070A14" : theme.textMuted }}>
        {label.toUpperCase()}
      </Text>
    </Pressable>
  );
}
