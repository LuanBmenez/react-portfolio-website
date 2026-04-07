import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}
      className={cn(
        "fixed top-5 right-5 z-50 p-3 rounded-xl transition-all duration-300 group",
        "bg-card/80 backdrop-blur-xl border border-border/50",
        "hover:scale-105 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        "active:scale-95"
      )}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-500",
            isDarkMode 
              ? "opacity-0 rotate-90 scale-50" 
              : "opacity-100 rotate-0 scale-100",
            "text-amber-500"
          )}
        />
        
        <Moon 
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-500",
            isDarkMode 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 -rotate-90 scale-50",
            "text-primary"
          )}
        />
      </div>
    </button>
  );
};
