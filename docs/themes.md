# Theme System Documentation

The Enterprise Design System includes a robust theming system that supports both light and dark modes with seamless transitions between them.

## Overview

The theme system is built on the following principles:

1. **User Preference**: Automatically detects and respects the user's system preference
2. **Manual Override**: Allows users to override their system preference
3. **Persistence**: Remembers the user's theme preference across sessions
4. **Adaptability**: All components adapt to theme changes without requiring specific implementation

## Theme Integration

### ThemeProvider

The `ThemeProvider` is the core component of the theme system. It manages theme state and provides context to all child components.

**Usage**:

```jsx
// In main.tsx or App.tsx
import { ThemeProvider } from './components/design-system/color-system/color-palette';

<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>
```

**Props**:
- `defaultTheme`: Initial theme ('light', 'dark', or 'system')
- `storageKey`: LocalStorage key for storing theme preference (default: 'enterprise-ds-ui-theme')
- `children`: React nodes to be wrapped by the provider

### ThemeToggle

The `ThemeToggle` component provides a user interface for switching between themes.

**Usage**:

```jsx
import { ThemeToggle } from './components/design-system/color-system/color-palette';

<header className="flex justify-between items-center p-4">
  <h1>My Application</h1>
  <ThemeToggle />
</header>
```

**Props**:
- `className`: Optional CSS class for custom styling

## Implementation Details

### Theme Storage

The selected theme is stored in localStorage under the key 'enterprise-ds-ui-theme' for persistence across browser sessions.

### System Theme Detection

System theme preference is detected using the `prefers-color-scheme` media query:

```javascript
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
```

The application also listens for changes to the system theme preference:

```javascript
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", handleSystemThemeChange);
```

### Theme Application

Themes are applied by adding CSS classes to the document root element:

```javascript
document.documentElement.classList.remove("light", "dark");
document.documentElement.classList.add(theme);
document.documentElement.setAttribute("data-theme", theme);
```

The `data-theme` attribute is used by shadcn components to apply appropriate styling.

## CSS Implementation

Themes are implemented using CSS variables and Tailwind CSS's dark mode feature:

```css
:root {
  /* Light theme colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other variables ... */
}

.dark {
  /* Dark theme colors */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... other variables ... */
}
```

### Theme Variants

The system supports three theme modes:

1. **Light Mode**: Bright backgrounds with dark text
2. **Dark Mode**: Dark backgrounds with light text
3. **System Mode**: Automatically follows the user's system preference

## Usage in Components

### Accessing Theme Context

Components can access the current theme and theme-changing function using the `useTheme` hook:

```jsx
import { useTheme } from '@/components/design-system/color-system/color-palette';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>
        Switch to Dark Mode
      </button>
    </div>
  );
}
```

### Theme-Aware Styling

Components should use CSS classes that respond to theme changes:

```jsx
// Use Tailwind's dark mode variant
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  Theme-aware content
</div>

// Use CSS variables
<div style={{ 
  backgroundColor: 'var(--background)', 
  color: 'var(--foreground)' 
}}>
  Theme-aware content
</div>
```

## Best Practices

1. **Use color tokens**: Always use the color system tokens instead of hardcoding colors
2. **Test in both themes**: Always test components in both light and dark modes
3. **Use semantic colors**: Use background/foreground pairs rather than individual colors
4. **Consider contrast**: Ensure text has sufficient contrast in both themes
5. **Animation**: Use subtle transitions when switching themes (150-300ms)
6. **Initial flash**: Prevent flash of wrong theme on page load by setting the theme class before the app renders

## Troubleshooting

### Theme Not Changing

If the theme isn't changing when toggled:

1. Check if the `ThemeProvider` is properly set up at the root of the application
2. Verify that components are using theme-aware styling (Tailwind dark: classes or CSS variables)
3. Clear localStorage and refresh the page
4. Check console logs for errors in the theme toggle function

### Inconsistent Theming

If components look inconsistent across themes:

1. Ensure all components are using the color token system
2. Check for hardcoded colors that might override theme settings
3. Verify that components are correctly wrapped by the `ThemeProvider`

## Extending the Theme System

### Adding New Theme Variables

To add new theme variables:

1. Add the variables to both the light and dark sections in `client/src/index.css`:

```css
:root {
  /* Light theme */
  --my-new-color: 210 100% 50%;
}

.dark {
  /* Dark theme */
  --my-new-color: 210 80% 40%;
}
```

2. Use the variables in components:

```jsx
<div style={{ color: `hsl(var(--my-new-color))` }}>
  Themed content
</div>
```

### Adding Additional Themes

To add themes beyond light and dark:

1. Create new CSS classes in `client/src/index.css` for each theme
2. Extend the Theme type in `client/src/components/design-system/color-system/color-palette.tsx`
3. Update the ThemeProvider to handle the new theme options
4. Provide UI for selecting the additional themes