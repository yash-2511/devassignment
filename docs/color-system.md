# Color System Documentation

The Enterprise Design System uses a comprehensive token-based color system that provides flexibility, consistency, and accessibility across the entire interface.

## Overview

The color system is built on the following principles:

1. **Token-based**: All colors are accessed through semantic tokens rather than direct values
2. **Accessible**: Color combinations meet WCAG AA contrast requirements
3. **Themable**: Colors adapt automatically between light and dark themes
4. **Hierarchical**: Multiple shade levels allow for creating visual hierarchy

## Color Tokens

### Primary Colors

Primary colors establish the main color identity of the application.

| Token | Description | Light Mode | Dark Mode |
|-------|-------------|------------|-----------|
| `primary-50` | Lightest primary | #f0f5ff | #1a1d2b |
| `primary-100` | Very light primary | #e5edff | #1e2131 |
| `primary-200` | Light primary | #cddbfe | #252a3c |
| `primary-300` | Soft primary | #b4c6fc | #303650 |
| `primary-400` | Medium primary | #8da2fb | #4b5482 |
| `primary-500` | Base primary | #3f65f8 | #3f65f8 |
| `primary-600` | Dark primary | #2f4cc8 | #6681fa |
| `primary-700` | Deeper primary | #1e3a9b | #8da2fb |
| `primary-800` | Very dark primary | #1c2b6b | #b4c6fc |
| `primary-900` | Darkest primary | #162149 | #e5edff |

### Secondary Colors

Secondary colors complement the primary colors and are used for secondary elements.

| Token | Description | Light Mode | Dark Mode |
|-------|-------------|------------|-----------|
| `secondary-50` | Lightest secondary | #f8fafc | #1a1c23 |
| `secondary-100` | Very light secondary | #f1f5f9 | #1e2028 |
| `secondary-200` | Light secondary | #e2e8f0 | #252836 |
| `secondary-300` | Soft secondary | #cbd5e1 | #2d3142 |
| `secondary-400` | Medium secondary | #94a3b8 | #5a617c |
| `secondary-500` | Base secondary | #64748b | #64748b |
| `secondary-600` | Dark secondary | #475569 | #94a3b8 |
| `secondary-700` | Deeper secondary | #334155 | #cbd5e1 |
| `secondary-800` | Very dark secondary | #1e293b | #e2e8f0 |
| `secondary-900` | Darkest secondary | #0f172a | #f1f5f9 |

### Tertiary Colors

Tertiary colors provide additional palette options for decorative elements and visualizations.

| Token | Description | Light Mode | Dark Mode |
|-------|-------------|------------|-----------|
| `tertiary-50` | Lightest tertiary | #f5f7ff | #1a1d28 |
| `tertiary-100` | Very light tertiary | #ecf0ff | #1e2230 |
| `tertiary-200` | Light tertiary | #d8e0ff | #262c3d |
| `tertiary-300` | Soft tertiary | #b8c7ff | #303853 |
| `tertiary-400` | Medium tertiary | #95a8ff | #4c557e |
| `tertiary-500` | Base tertiary | #6678ff | #6678ff |
| `tertiary-600` | Dark tertiary | #4f5fcf | #7b8cff |
| `tertiary-700` | Deeper tertiary | #3b49af | #95a8ff |
| `tertiary-800` | Very dark tertiary | #2c3780 | #b8c7ff |
| `tertiary-900` | Darkest tertiary | #1f2860 | #ecf0ff |

### Semantic Colors

Semantic colors convey specific meanings across the interface.

#### Success

| Token | Description | Light Mode | Dark Mode |
|-------|-------------|------------|-----------|
| `success-50` | Light success | #f0fdf4 | #0c1f0f |
| `success-500` | Base success | #22c55e | #22c55e |
| `success-700` | Dark success | #15803d | #4ade80 |

#### Warning

| Token | Description | Light Mode | Dark Mode |
|-------|-------------|------------|-----------|
| `warning-50` | Light warning | #fffbeb | #1f1b0d |
| `warning-500` | Base warning | #f59e0b | #f59e0b |
| `warning-700` | Dark warning | #b45309 | #fbbf24 |

#### Error

| Token | Description | Light Mode | Dark Mode |
|-------|-------------|------------|-----------|
| `error-50` | Light error | #fef2f2 | #1f0d0d |
| `error-500` | Base error | #ef4444 | #ef4444 |
| `error-700` | Dark error | #b91c1c | #f87171 |

#### Info

| Token | Description | Light Mode | Dark Mode |
|-------|-------------|------------|-----------|
| `info-50` | Light info | #eff6ff | #0d1520 |
| `info-500` | Base info | #3b82f6 | #3b82f6 |
| `info-700` | Dark info | #1d4ed8 | #60a5fa |

## Surface Colors

Surface colors are used for different background layers of the interface.

| Token | Description | Light Mode | Dark Mode |
|-------|-------------|------------|-----------|
| `surface-background` | Main application background | #ffffff | #121212 |
| `surface-foreground` | Main text color | #18181b | #f8fafc |
| `surface-card` | Card and elevated element backgrounds | #ffffff | #1e1e1e |
| `surface-card-foreground` | Text on cards | #18181b | #f8fafc |
| `surface-popover` | Popover and tooltip backgrounds | #ffffff | #262626 |
| `surface-popover-foreground` | Text on popovers | #18181b | #f8fafc |
| `surface-primary` | Primary surface for components | #ffffff | #151515 |
| `surface-secondary` | Secondary surface for components | #f1f5f9 | #1c1c1c |
| `surface-muted` | Muted surface for subtle UI elements | #f8fafc | #262626 |
| `surface-accent` | Accent surface for highlighted UI elements | #f0f5ff | #1a1d2b |

## Usage Guidelines

### Accessing Color Tokens

Use the utility functions to access color tokens:

```typescript
import { getColorToken } from '@/components/design-system/color-system/color-tokens';

// Get a specific primary color
const primaryColor = getColorToken('primary', 500);

// Get a semantic color
const successColor = getSemanticToken('success', 500);

// Get a surface color
const backgroundColor = getSurfaceToken('background', 'light');
```

### Color Usage Principles

1. **Use semantic tokens**: Instead of using raw color values, always use the appropriate semantic token
2. **Follow hierarchical patterns**: Use darker/lighter shades to create visual hierarchy
3. **Ensure accessibility**: Maintain sufficient contrast between text and background colors
4. **Be consistent**: Use colors consistently for similar actions and states
5. **Use colors purposefully**: Don't use colors decoratively without meaning

### Extending the Color System

To add new colors to the system:

1. Update the color definitions in `client/src/components/design-system/color-system/color-tokens.ts`
2. Follow the existing pattern for creating a consistent system
3. Ensure new colors work in both light and dark modes
4. Add appropriate CSS variables in `client/src/index.css`

## Implementation Details

The color system is implemented as CSS variables with different values for light and dark modes:

```css
:root {
  /* Light mode defaults */
  --primary-50: #f0f5ff;
  --primary-500: #3f65f8;
  /* ...other colors... */
}

.dark {
  /* Dark mode overrides */
  --primary-50: #1a1d2b;
  --primary-500: #3f65f8;
  /* ...other colors... */
}
```

These variables are then accessed through the utility functions for consistent usage across the application.