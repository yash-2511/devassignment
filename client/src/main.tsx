import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/design-system/color-system/color-palette";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light">
    <App />
  </ThemeProvider>
);
