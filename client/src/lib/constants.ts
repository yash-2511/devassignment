/**
 * Color system constants
 */
export const COLOR_VARIANTS = {
  primary: 'Primary',
  secondary: 'Secondary',
  tertiary: 'Tertiary'
} as const;

export const NEUTRAL_VARIANTS = {
  neutral: 'Neutral'
} as const;

export const SEMANTIC_VARIANTS = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Info'
} as const;

export const SURFACE_VARIANTS = {
  surface: 'Surface',
  background: 'Background'
} as const;

export const ALL_COLOR_VARIANTS = {
  ...COLOR_VARIANTS,
  ...NEUTRAL_VARIANTS,
  ...SEMANTIC_VARIANTS,
  ...SURFACE_VARIANTS
} as const;

export type ColorVariant = keyof typeof COLOR_VARIANTS;
export type NeutralVariant = keyof typeof NEUTRAL_VARIANTS;
export type SemanticVariant = keyof typeof SEMANTIC_VARIANTS;
export type SurfaceVariant = keyof typeof SURFACE_VARIANTS;
export type AllColorVariant = keyof typeof ALL_COLOR_VARIANTS;

export const THEME_MODES = {
  light: 'Light',
  dark: 'Dark'
} as const;

export type ThemeMode = keyof typeof THEME_MODES;

/**
 * Component sizes
 */
export const COMPONENT_SIZES = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
} as const;

export type ComponentSize = keyof typeof COMPONENT_SIZES;

/**
 * Badge types
 */
export const BADGE_VARIANTS = {
  default: 'Default',
  outline: 'Outline',
  secondary: 'Secondary',
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANTS;
