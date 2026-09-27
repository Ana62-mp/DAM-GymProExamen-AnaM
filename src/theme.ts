export const colors = {
  primary: "#8F1D24",
  primaryDark: "#65151A",
  accent: "#C9363F",
  accentSoft: "#FBEAEC",
  background: "#F7F7F7",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F1F1",
  text: "#151515",
  textMuted: "#686868",
  border: "#E6E3E3",
  success: "#257A55",
  white: "#FFFFFF",
} as const;

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 26,
  pill: 999,
} as const;

export const shadow = {
  shadowColor: colors.primaryDark,
  shadowOffset: { width: 0, height: 7 },
  shadowOpacity: 0.12,
  shadowRadius: 14,
  elevation: 4,
} as const;
