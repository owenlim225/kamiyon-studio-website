"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useHeroScrollBounce } from "@/hooks/useHeroScrollBounce";

export function HeroScrollHelper() {
  const { visible, dismiss } = useHeroScrollBounce({
    threshold: 24,
    maxBounces: 1,
  });
  const reduceMotion = useReducedMotion();

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="absolute left-1/2 top-24 z-20 -translate-x-1/2"
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative rounded-2xl bg-[var(--color-sakura)] px-4 py-2 font-sans text-[var(--text-on-accent)] shadow-sm">
        <span
          className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-[var(--color-sakura)]"
          aria-hidden="true"
        />
        <div className="flex items-center gap-1">
          <p className="text-sm font-medium">Scroll down</p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss scroll tip"
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-lg leading-none transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-on-accent)]"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
