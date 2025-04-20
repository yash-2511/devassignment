import { AllColorVariant, COLOR_VARIANTS, NEUTRAL_VARIANTS, SEMANTIC_VARIANTS, SURFACE_VARIANTS } from "../../../lib/constants";

/**
 * Color token type definitions
 */
export type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type SemanticScale = 50 | 500 | 700;
export type SurfaceVariants = 'light' | 'dark';

/**
 * Token-based color system
 * This provides a centralized way to access color values by variant and scale
 */
export const getColorToken = (variant: keyof typeof COLOR_VARIANTS, scale: ColorScale): string => {
  return `var(--${variant}-${scale})`;
};

export const getNeutralToken = (scale: ColorScale): string => {
  return `var(--neutral-${scale})`;
};

export const getSemanticToken = (variant: keyof typeof SEMANTIC_VARIANTS, scale: SemanticScale): string => {
  return `var(--${variant}-${scale})`;
};

export const getSurfaceToken = (variant: keyof typeof SURFACE_VARIANTS, mode: SurfaceVariants = 'light'): string => {
  if (variant === 'surface') {
    return `var(--surface)`;
  }
  return `var(--background)`;
};

/**
 * Utility function to get the CSS variable for any color in the system
 */
export const getColorByToken = (variant: AllColorVariant, scale: ColorScale | SemanticScale | string = 500): string => {
  // Handle primary, secondary, tertiary colors
  if (variant in COLOR_VARIANTS) {
    return getColorToken(variant as keyof typeof COLOR_VARIANTS, scale as ColorScale);
  }
  
  // Handle neutral colors
  if (variant in NEUTRAL_VARIANTS) {
    return getNeutralToken(scale as ColorScale);
  }
  
  // Handle semantic colors
  if (variant in SEMANTIC_VARIANTS) {
    return getSemanticToken(variant as keyof typeof SEMANTIC_VARIANTS, scale as SemanticScale);
  }
  
  // Handle surface/background
  if (variant in SURFACE_VARIANTS) {
    return getSurfaceToken(variant as keyof typeof SURFACE_VARIANTS, scale as SurfaceVariants);
  }
  
  // Fallback
  return `var(--${variant}-${scale})`;
};

/**
 * Color palette configuration
 * This defines all the colors used in the design system
 */
export const colorPalette = {
  primary: {
    50: 'hsl(214, 100%, 97%)',
    100: 'hsl(214, 100%, 93%)',
    200: 'hsl(213, 97%, 87%)',
    300: 'hsl(212, 96%, 78%)',
    400: 'hsl(213, 94%, 68%)',
    500: 'hsl(217, 91%, 60%)',
    600: 'hsl(221, 83%, 53%)',
    700: 'hsl(224, 76%, 48%)',
    800: 'hsl(226, 71%, 40%)',
    900: 'hsl(224, 71%, 28%)',
  },
  secondary: {
    50: 'hsl(252, 100%, 98%)',
    100: 'hsl(252, 100%, 96%)',
    200: 'hsl(251, 91%, 95%)',
    300: 'hsl(250, 95%, 86%)',
    400: 'hsl(252, 85%, 76%)',
    500: 'hsl(252, 78%, 64%)',
    600: 'hsl(255, 70%, 58%)',
    700: 'hsl(258, 66%, 50%)',
    800: 'hsl(259, 64%, 42%)',
    900: 'hsl(262, 63%, 36%)',
  },
  tertiary: {
    50: 'hsl(327, 73%, 97%)',
    100: 'hsl(326, 78%, 95%)',
    200: 'hsl(326, 85%, 90%)',
    300: 'hsl(327, 87%, 81%)',
    400: 'hsl(329, 86%, 70%)',
    500: 'hsl(330, 81%, 60%)',
    600: 'hsl(333, 71%, 51%)',
    700: 'hsl(335, 78%, 42%)',
    800: 'hsl(336, 74%, 35%)',
    900: 'hsl(336, 69%, 30%)',
  },
  neutral: {
    50: 'hsl(210, 20%, 98%)',
    100: 'hsl(220, 14%, 96%)',
    200: 'hsl(220, 13%, 91%)',
    300: 'hsl(216, 12%, 84%)',
    400: 'hsl(218, 11%, 65%)',
    500: 'hsl(220, 9%, 46%)',
    600: 'hsl(215, 14%, 34%)',
    700: 'hsl(217, 19%, 27%)',
    800: 'hsl(215, 28%, 17%)',
    900: 'hsl(221, 39%, 11%)',
  },
  success: {
    50: 'hsl(152, 76%, 96%)',
    500: 'hsl(160, 84%, 39%)',
    700: 'hsl(161, 94%, 24%)',
  },
  error: {
    50: 'hsl(0, 86%, 97%)',
    500: 'hsl(0, 84%, 60%)',
    700: 'hsl(0, 74%, 42%)',
  },
  warning: {
    50: 'hsl(48, 100%, 96%)',
    500: 'hsl(36, 100%, 50%)',
    700: 'hsl(33, 100%, 37%)',
  },
  info: {
    50: 'hsl(214, 100%, 97%)',
    500: 'hsl(217, 91%, 60%)',
    700: 'hsl(224, 76%, 48%)',
  }
};

export type ColorPalette = typeof colorPalette;
