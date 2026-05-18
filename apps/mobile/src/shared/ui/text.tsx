import { Text as RNText, type TextProps, type TextStyle } from "react-native";
import { typography } from "@breathflow/ui";
import { useTheme } from "./theme-provider.js";

export type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodyBold"
  | "caption"
  | "micro"
  | "timer-num"
  | "timer-phase";

interface Props extends TextProps {
  variant?: TextVariant;
  tone?: "default" | "muted" | "dim" | "accent" | "danger" | "success";
  align?: TextStyle["textAlign"];
}

const EXTRA: Record<"timer-num" | "timer-phase", TextStyle> = {
  "timer-num": {
    fontFamily: "Inter_700Bold",
    fontSize: 88,
    lineHeight: 96,
    fontVariant: ["tabular-nums"],
  },
  "timer-phase": { fontFamily: "Inter_500Medium", fontSize: 28, lineHeight: 36 },
};

export function Text({ variant = "body", tone = "default", align, style, ...rest }: Props) {
  const theme = useTheme();
  const t: TextStyle =
    variant in typography
      ? (typography[variant as keyof typeof typography] as TextStyle)
      : EXTRA[variant as keyof typeof EXTRA];
  const color =
    tone === "muted"
      ? theme.textMuted
      : tone === "dim"
        ? theme.textDim
        : tone === "accent"
          ? theme.accent
          : tone === "danger"
            ? theme.danger
            : tone === "success"
              ? theme.success
              : theme.text;
  return <RNText {...rest} style={[t, { color, textAlign: align }, style]} />;
}
