"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Default to LIGHT mode (teal & white). Only go dark if explicitly chosen.
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light-force");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = (!isDark);
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light-force");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light-force");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2.5 text-text-secondary hover:text-teal-primary hover:bg-surface-alt border border-border rounded-md transition-all duration-200"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {isDark ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
      </motion.div>
    </motion.button>
  );
}
