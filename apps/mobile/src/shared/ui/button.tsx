import {
  Pressable,
  type PressableProps,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { radius, space } from "@breathflow/ui";
import { Text } from "./text.js";
import { useTheme } from "./theme-provider.js";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "lg" | "md" | "sm";

interface Props extends Omit<PressableProps, "children" | "style"> {
  variant?: Variant;
  size?: Size;
  label: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const HEIGHTS: Record<Size, number> = { lg: 52, md: 44, sm: 32 };

export function Button({
  variant = "primary",
  size = "md",
  label,
  leading,
  trailing,
  fullWidth,
  disabled,
  style,
  ...rest
}: Props) {
  const theme = useTheme();
  const bg =
    variant === "primary"
      ? theme.accent
      : variant === "secondary"
        ? theme.surfaceElev
        : variant === "danger"
          ? theme.danger
          : "transparent";
  const fg =
    variant === "primary" || variant === "danger"
      ? "#070A14"
      : variant === "secondary"
        ? theme.text
        : theme.textMuted;
  const border = variant === "ghost" ? theme.border : "transparent";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      {...rest}
      style={({ pressed }) => [
        styles.base,
        {
          height: HEIGHTS[size],
          backgroundColor: bg,
          borderColor: border,
          borderWidth: variant === "ghost" ? 1 : 0,
          opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
          width: fullWidth ? "100%" : undefined,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        style,
      ]}
    >
      {leading ? <View style={styles.icon}>{leading}</View> : null}
      <Text variant={size === "sm" ? "caption" : "bodyBold"} style={{ color: fg }}>
        {label}
      </Text>
      {trailing ? <View style={styles.icon}>{trailing}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space[5],
    gap: space[2],
    borderRadius: radius.md,
  },
  icon: { alignItems: "center", justifyContent: "center" },
});
