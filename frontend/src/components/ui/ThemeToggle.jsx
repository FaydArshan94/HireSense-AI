"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ onClick }) {
    const { theme, toggleTheme } = useTheme();

    const handleClick = () => {
        toggleTheme();
        if (onClick) onClick();
    };

    return (
        <button
            onClick={handleClick}
            className="p-2 rounded-lg bg-muted hover:bg-muted/30  hover:text-primary transition-colors"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon size={20} className="text-foreground" />
            ) : (
                <Sun size={20} className="text-foreground" />
            )}
        </button>
    );
}
