"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, X, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function DarkModeBanner() {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevThemeRef = useRef(theme);

  useEffect(() => setMounted(true), []);

  // Auto-dismiss after 6 seconds
  useEffect(() => {
    timerRef.current = setTimeout(() => setVisible(false), 6000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Reappear on theme switch
  useEffect(() => {
    if (prevThemeRef.current !== theme) {
      prevThemeRef.current = theme;
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(true);
      timerRef.current = setTimeout(() => setVisible(false), 6000);
    }
  }, [theme]);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-50 bg-background/80 backdrop-blur-xl border-b border-charcoal-light overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2 sm:gap-3 text-center">
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
            onClick={() => setVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-charcoal flex items-center justify-center transition-colors"
            aria-label="Dismiss"
          >
            <X size={12} className="text-muted" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
