"use client";

import { motion } from "motion/react";
import { IconContrastFilled } from "@tabler/icons-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      className="relative w-9 h-9 rounded-md border border-divider bg-transparent hover:bg-foreground/5 flex items-center justify-center transition-colors duration-200"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <IconContrastFilled size={16} strokeWidth={0} className="text-muted" />
      </motion.div>
    </motion.button>
  );
}
