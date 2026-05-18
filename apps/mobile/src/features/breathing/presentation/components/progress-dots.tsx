import { View } from "react-native";
import { space } from "@breathflow/ui";
import { useTheme } from "../../../../shared/ui/theme-provider.js";

interface Props {
  total: number;
  current: number;
}

export function ProgressDots({ total, current }: Props) {
  const theme = useTheme();
  const cap = Math.min(total, 12);
  return (
    <View style={{ flexDirection: "row", gap: space[1] }}>
      {Array.from({ length: cap }).map((_, i) => {
        const filled = i < current;
        return (
          <View
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: filled ? theme.accent : theme.border,
            }}
          />
        );
      })}
    </View>
  );
}
