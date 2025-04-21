import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/design-system/color-system/color-palette";
import "./index.css";

// Initialize the document with a default theme class before React loads
// This prevents a flash of unstyled content
const storedTheme = localStorage.getItem('enterprise-ds-ui-theme');
let initialTheme = "light";

// Clear any existing theme classes first
document.documentElement.classList.remove('light', 'dark');

if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
  initialTheme = storedTheme;
  document.documentElement.classList.add(storedTheme);
  document.documentElement.setAttribute('data-theme', storedTheme);
} else {
  // If no stored theme or invalid value, check system preference
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  initialTheme = systemTheme;
  document.documentElement.classList.add(systemTheme);
  document.documentElement.setAttribute('data-theme', systemTheme);
}

console.log('Initial theme set to:', initialTheme, 'from', storedTheme ? 'localStorage' : 'system preference');

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme={initialTheme as "light" | "dark" | "system"}>
    <App />
  </ThemeProvider>
);
