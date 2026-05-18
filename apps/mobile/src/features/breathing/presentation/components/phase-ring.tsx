import { Canvas, Circle, Group, Shadow } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { Phase } from "@breathflow/breath-engine";
import { useTheme } from "../../../../shared/ui/theme-provider";

interface Props {
  phase: Phase | null;
  phaseDurationMs: number;
}

const MIN_FACTOR = 0.35;
const MAX_FACTOR = 0.95;

export function PhaseRing({ phase, phaseDurationMs }: Props) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const center = width / 2;
  const minR = width * (MIN_FACTOR / 2);
  const maxR = width * (MAX_FACTOR / 2);
  const radius = useSharedValue(minR);

  useEffect(() => {
    if (!phase || phaseDurationMs <= 0) {
      radius.value = withTiming(minR, { duration: 200 });
      return;
    }
    const target =
      phase === "inhale"
        ? maxR
        : phase === "hold_full"
          ? maxR
          : phase === "exhale"
            ? minR
            : minR;
    radius.value = withTiming(target, {
      duration: phaseDurationMs,
      easing: Easing.bezier(0.45, 0, 0.55, 1),
    });
  }, [phase, phaseDurationMs, minR, maxR, radius]);

  const drawRadius = useDerivedValue(() => radius.value, [radius]);

  const color =
    phase === "inhale"
      ? theme.phase.inhale
      : phase === "hold_full"
        ? theme.phase.hold_full
        : phase === "exhale"
          ? theme.phase.exhale
          : phase === "hold_empty"
            ? theme.phase.hold_empty
            : theme.surfaceElev;

  return (
    <Canvas style={{ width, height: width }}>
      <Group>
        <Circle cx={center} cy={center} r={drawRadius} color={color} opacity={0.18}>
          <Shadow dx={0} dy={0} blur={48} color={color} />
        </Circle>
        <Circle
          cx={center}
          cy={center}
          r={drawRadius}
          style="stroke"
          strokeWidth={3}
          color={color}
        />
      </Group>
    </Canvas>
  );
}
