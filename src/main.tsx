import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./utils/providers/ThemeProvider.tsx";
import { QueryProvider } from "./lib/QueryProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryProvider>
    </Router>
  </StrictMode>
);
