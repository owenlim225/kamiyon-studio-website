"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

export type UseHeroScrollBounceOptions = {
  threshold?: number;
  maxBounces?: number;
};

export type UseHeroScrollBounceResult = {
  visible: boolean;
  dismiss: () => void;
};

const SCROLL_INTENT_KEYS = new Set([
  "ArrowDown",
  "PageDown",
  " ",
  "Spacebar",
  "End",
]);

const RETURN_SETTLE_MS = 800;
const USER_INTENT_MS = 500;

/**
 * One-shot scroll bounce on the home hero: after user-driven scroll past
 * `threshold`, smoothly return to y=0, then release.
 */
export function useHeroScrollBounce(
  options: UseHeroScrollBounceOptions = {},
): UseHeroScrollBounceResult {
  const { threshold = 24, maxBounces = 1 } = options;
  const [visible, setVisible] = useState(true);
  const bounceCountRef = useRef(0);
  const isReturningRef = useRef(false);
  const dismissedRef = useRef(false);
  const userIntentUntilRef = useRef(0);
  const returnCleanupRef = useRef<(() => void) | null>(null);

  const clearReturnCleanup = useCallback(() => {
    returnCleanupRef.current?.();
    returnCleanupRef.current = null;
  }, []);

  const completeReturn = useCallback(() => {
    clearReturnCleanup();
    isReturningRef.current = false;
  }, [clearReturnCleanup]);

  const returnToTop = useCallback(() => {
    clearReturnCleanup();

    window.scrollTo({ top: 0, behavior: "smooth" });

    const onScroll = () => {
      if (window.scrollY <= 0) {
        completeReturn();
      }
    };

    const settleTimer = window.setTimeout(() => {
      completeReturn();
    }, RETURN_SETTLE_MS);

    window.addEventListener("scroll", onScroll, { passive: true });
    returnCleanupRef.current = () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [completeReturn, clearReturnCleanup]);

  const tryBounce = useCallback(
    (scrollY: number) => {
      if (dismissedRef.current || isReturningRef.current) {
        return;
      }

      if (performance.now() > userIntentUntilRef.current) {
        return;
      }

      if (prefersReducedMotion()) {
        return;
      }

      if (bounceCountRef.current >= maxBounces) {
        return;
      }

      if (scrollY <= threshold) {
        return;
      }

      bounceCountRef.current += 1;
      isReturningRef.current = true;
      userIntentUntilRef.current = 0;

      if (bounceCountRef.current >= maxBounces) {
        setVisible(false);
      }

      returnToTop();
    },
    [maxBounces, returnToTop, threshold],
  );

  const markUserIntent = useCallback(() => {
    userIntentUntilRef.current = performance.now() + USER_INTENT_MS;
  }, []);

  const dismiss = useCallback(() => {
    dismissedRef.current = true;
    clearReturnCleanup();
    isReturningRef.current = false;
    setVisible(false);
  }, [clearReturnCleanup]);

  useEffect(() => {
    const onWheel = () => {
      markUserIntent();
    };

    const onTouchMove = () => {
      markUserIntent();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!SCROLL_INTENT_KEYS.has(event.key)) {
        return;
      }
      markUserIntent();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [markUserIntent]);

  useEffect(() => {
    const onScroll = () => {
      tryBounce(window.scrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearReturnCleanup();
    };
  }, [tryBounce, clearReturnCleanup]);

  return { visible, dismiss };
}
