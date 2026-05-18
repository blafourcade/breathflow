import { View, type ViewProps } from "react-native";
import { radius, space } from "@breathflow/ui";
import { useTheme } from "./theme-provider.js";

interface Props extends ViewProps {
  elevated?: boolean;
}

export function Card({ elevated, style, ...rest }: Props) {
  const theme = useTheme();
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: elevated ? theme.surfaceElev : theme.surface,
          borderRadius: radius.lg,
          padding: space[5],
          borderColor: theme.border,
          borderWidth: 1,
        },
        style,
      ]}
    />
  );
}
