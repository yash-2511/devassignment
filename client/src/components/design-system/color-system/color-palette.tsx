import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "enterprise-ds-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  // Handle theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Debug - showing current theme state
    console.log("ThemeProvider: changing theme to", theme);
    console.log("Current root classes:", root.classList.value);
    
    // First remove all theme classes
    root.classList.remove("light", "dark");

    // Handle system theme preference
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      
      console.log("System theme detected as:", systemTheme);
      
      // Apply the system theme
      root.classList.add(systemTheme);
      root.setAttribute("data-theme", systemTheme);
      return;
    }

    // Apply the explicit theme
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
    
    // Debug - show final state
    console.log("Applied theme classes:", root.classList.value);
  }, [theme]);

  // Watch for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Define handler for system theme changes
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        // If we're in system theme mode, update when system changes
        const newSystemTheme = mediaQuery.matches ? "dark" : "light";
        console.log("System theme changed to:", newSystemTheme);
        
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newSystemTheme);
        root.setAttribute("data-theme", newSystemTheme);
      }
    };
    
    // Listen for system theme changes
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    
    // Clean up listener
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  // Define the context value
  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      console.log("Setting new theme:", newTheme);
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

/**
 * Color Palette Display Component
 * Used for showcasing the color system in Storybook and the design system documentation
 */
export interface ColorPaletteProps {
  variant: string;
  label: string;
  color: string;
  colorValue: string;
  scales?: React.ReactNode;
}

export const ColorPaletteItem: React.FC<ColorPaletteProps> = ({
  variant,
  label,
  color,
  colorValue,
  scales,
}) => {
  return (
    <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700">
      <div style={{ backgroundColor: color }} className="h-24"></div>
      <div className="p-4">
        <h3 className="font-medium">{label}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{variant}</p>
        <div className="mt-2 flex items-center">
          <span className="text-sm font-mono text-neutral-700 dark:text-neutral-300">{colorValue}</span>
        </div>
      </div>
      {scales && <div className="px-4 pb-4">{scales}</div>}
    </div>
  );
};

export interface ColorScaleProps {
  variant: string;
  scales: { scale: string | number; color: string }[];
}

export const ColorScales: React.FC<ColorScaleProps> = ({ variant, scales }) => {
  return (
    <div className="grid grid-cols-5 gap-1">
      {scales.map(({ scale, color }) => (
        <div
          key={`${variant}-${scale}`}
          style={{ backgroundColor: color }}
          className={`h-8 rounded text-xs flex items-center justify-center ${
            Number(scale) > 300 ? "text-white" : "text-neutral-800"
          }`}
        >
          {scale}
        </div>
      ))}
    </div>
  );
};

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Check actual current theme from document.documentElement.classList
    const isDarkMode = document.documentElement.classList.contains('dark');
    const newTheme = isDarkMode ? "light" : "dark";
    
    // Log current state for debugging
    console.log("Current document class:", document.documentElement.classList.value);
    console.log("Current theme state:", theme);
    console.log("Is dark mode active:", isDarkMode);
    console.log("Setting new theme to:", newTheme);
    
    // Set the theme
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${className}`}
      aria-label="Toggle dark mode"
    >
      {/* Sun icon (shown in dark mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 hidden dark:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      {/* Moon icon (shown in light mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 dark:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};
