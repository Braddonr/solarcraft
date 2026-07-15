"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, X, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function DarkModeBanner() {
  const { theme } = useTheme();
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || dismissed) return null;

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-16 sm:top-18 left-0 right-0 z-40"
      >
        <div className={`relative px-4 py-2.5 text-center transition-colors duration-500 ${
          isDark
            ? "bg-amber/10 border-b border-amber/20"
            : "bg-amber/5 border-b border-charcoal-light"
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3">
            {isDark ? (
              <>
                <Zap size={14} className="text-amber shrink-0 hidden sm:block" />
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold text-amber">Tired of the darkness?</span>
                  <span className="text-muted mx-1.5">—</span>
                  <span className="text-foreground">Go solar and keep the lights on </span>
                  <span className="text-amber font-medium">24/7</span>
                  <span className="text-muted"> ☀️</span>
                </p>
                <Zap size={14} className="text-amber shrink-0 hidden sm:block" />
              </>
            ) : (
              <>
                <Sun size={14} className="text-amber shrink-0 hidden sm:block" />
                <p className="text-xs sm:text-sm">
                  <span className="font-semibold text-foreground">Love the light mode?</span>
                  <span className="text-muted mx-1.5">—</span>
                  <span className="text-muted">Imagine that energy powering your home. </span>
                  <a href="#contact" className="text-amber font-medium hover:text-amber-light transition-colors">Get a free quote →</a>
                </p>
                <Sun size={14} className="text-amber shrink-0 hidden sm:block" />
              </>
            )}
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-charcoal flex items-center justify-center transition-colors"
            aria-label="Dismiss"
          >
            <X size={12} className="text-muted" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
