import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="link"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`grid h-11 w-11 place-items-center border border-line transition-colors hover:border-accent hover:bg-accent hover:text-on-accent ${className}`}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
