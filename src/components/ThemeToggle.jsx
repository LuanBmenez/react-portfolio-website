import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
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
    setIsAnimating(true);
    
    setTimeout(() => {
      if (isDarkMode) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDarkMode(true);
      }
      setIsAnimating(false);
    }, 150);
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={isAnimating}
      aria-label={isDarkMode ? "Ativar tema claro" : "Ativar tema escuro"}
      className={cn(
        "fixed top-5 right-5 z-50 p-3 rounded-full transition-all duration-500 group",
        "bg-background/80 backdrop-blur-md border border-border shadow-lg",
        "hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary",
        "hover:shadow-xl hover:shadow-primary/20",
        isAnimating && "scale-95",
        "sm:block"
      )}
    >
      <div className="relative w-6 h-6">
  
        <Sun 
          className={cn(
            "absolute inset-0 h-6 w-6 transition-all duration-500",
            isDarkMode 
              ? "opacity-0 rotate-180 scale-50" 
              : "opacity-100 rotate-0 scale-100",
            "text-yellow-500 group-hover:text-yellow-400"
          )}
        />
        
        <Moon 
          className={cn(
            "absolute inset-0 h-6 w-6 transition-all duration-500",
            isDarkMode 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 -rotate-180 scale-50",
            "text-slate-300 group-hover:text-white"
          )}
        />
        
        <div className={cn(
          "absolute inset-0 rounded-full transition-all duration-500",
          isDarkMode 
            ? "bg-gradient-to-r from-blue-400/20 to-purple-400/20 scale-0" 
            : "bg-gradient-to-r from-yellow-400/20 to-orange-400/20 scale-0",
          "group-hover:scale-150 group-hover:opacity-50"
        )} />
      </div>
      
      <div className={cn(
        "absolute -bottom-1 -right-1 w-3 h-3 rounded-full transition-all duration-300",
        isDarkMode 
          ? "bg-blue-400 shadow-lg shadow-blue-400/50" 
          : "bg-yellow-400 shadow-lg shadow-yellow-400/50",
        isAnimating && "scale-75"
      )} />
    </button>
  );
};
