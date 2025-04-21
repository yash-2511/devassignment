import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/design-system/color-system/color-palette";
import "./index.css";

// Initialize the document with a default theme class before React loads
// This prevents a flash of unstyled content
const storedTheme = localStorage.getItem('enterprise-ds-ui-theme');
if (storedTheme) {
  document.documentElement.classList.add(storedTheme);
  document.documentElement.setAttribute('data-theme', storedTheme);
} else {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.classList.add(systemTheme);
  document.documentElement.setAttribute('data-theme', systemTheme);
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system">
    <App />
  </ThemeProvider>
);
