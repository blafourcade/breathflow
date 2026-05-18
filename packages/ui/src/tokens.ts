export const palette = {
  ink: {
    900: "#070A14",
    800: "#0E1322",
    700: "#161D33",
    600: "#222B47",
    500: "#3A4566",
    400: "#5B6789",
    300: "#8E97B3",
    200: "#BFC6DA",
    100: "#E3E7F2",
    50: "#F6F8FD",
  },
  breath: {
    inhale: "#7AB8FF",
    inhaleSoft: "#1E4B7F",
    holdFull: "#A78BFA",
    holdFullSoft: "#3C2D77",
    exhale: "#34D399",
    exhaleSoft: "#0F4F3A",
    holdEmpty: "#475569",
    holdEmptySoft: "#1F2937",
  },
  accent: {
    fire: "#FF7A59",
    sun: "#FFC857",
    rose: "#F472B6",
    sky: "#7AB8FF",
  },
  semantic: {
    success: "#34D399",
    warning: "#FFC857",
    danger: "#F87171",
    info: "#7AB8FF",
  },
} as const;

export const themes = {
  dark: {
    bg: palette.ink[900],
    surface: palette.ink[800],
    surfaceElev: palette.ink[700],
    border: palette.ink[600],
    text: palette.ink[50],
    textMuted: palette.ink[300],
    textDim: palette.ink[400],
  },
  light: {
    bg: palette.ink[50],
    surface: "#FFFFFF",
    surfaceElev: palette.ink[100],
    border: palette.ink[200],
    text: palette.ink[900],
    textMuted: palette.ink[500],
    textDim: palette.ink[400],
  },
} as const;

export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  full: 9999,
} as const;

export const typography = {
  display: { fontFamily: "Inter_700Bold", fontSize: 40, lineHeight: 48 },
  h1: { fontFamily: "Inter_700Bold", fontSize: 32, lineHeight: 40 },
  h2: { fontFamily: "Inter_600SemiBold", fontSize: 24, lineHeight: 32 },
  h3: { fontFamily: "Inter_600SemiBold", fontSize: 20, lineHeight: 28 },
  body: { fontFamily: "Inter_400Regular", fontSize: 16, lineHeight: 24 },
  bodyBold: { fontFamily: "Inter_600SemiBold", fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 18 },
  micro: { fontFamily: "Inter_500Medium", fontSize: 11, lineHeight: 14 },
} as const;

export const motion = {
  duration: { fast: 120, base: 240, slow: 480, breath: 4000 },
  easing: {
    standard: [0.4, 0, 0.2, 1] as const,
    decel: [0, 0, 0.2, 1] as const,
    accel: [0.4, 0, 1, 1] as const,
    breath: [0.45, 0, 0.55, 1] as const,
  },
} as const;

export const elevation = {
  none: { shadowOpacity: 0 },
  sm: { shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  md: { shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  lg: { shadowOpacity: 0.18, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } },
} as const;

export const tokens = { palette, themes, space, radius, typography, motion, elevation };
export type Tokens = typeof tokens;
