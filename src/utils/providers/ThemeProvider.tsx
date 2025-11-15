
import { useEffect, useState} from "react";
import type { ReactNode } from "react";
import type { Theme } from "../../constants/types/Theme.ts";
import { ThemeContext } from "../contexts/ThemeContext.tsx";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply theme to body & save to localStorage
  useEffect(() => {
    document.documentElement.classList.remove(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

