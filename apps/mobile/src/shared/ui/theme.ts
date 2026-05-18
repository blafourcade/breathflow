import { palette, themes } from "@breathflow/ui";

export type ThemeMode = "dark" | "light";

export interface Theme {
  mode: ThemeMode;
  bg: string;
  surface: string;
  surfaceElev: string;
  border: string;
  text: string;
  textMuted: string;
  textDim: string;
  accent: string;
  danger: string;
  success: string;
  warning: string;
  phase: {
    inhale: string;
    hold_full: string;
    exhale: string;
    hold_empty: string;
  };
}

export function makeTheme(mode: ThemeMode): Theme {
  const t = themes[mode];
  return {
    mode,
    bg: t.bg,
    surface: t.surface,
    surfaceElev: t.surfaceElev,
    border: t.border,
    text: t.text,
    textMuted: t.textMuted,
    textDim: t.textDim,
    accent: palette.accent.sky,
    danger: palette.semantic.danger,
    success: palette.semantic.success,
    warning: palette.semantic.warning,
    phase: {
      inhale: palette.breath.inhale,
      hold_full: palette.breath.holdFull,
      exhale: palette.breath.exhale,
      hold_empty: palette.breath.holdEmpty,
    },
  };
}
