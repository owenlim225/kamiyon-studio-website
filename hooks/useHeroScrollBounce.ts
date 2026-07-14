"use client";

import { useLenis } from "lenis/react";
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

export function useHeroScrollBounce(
  options: UseHeroScrollBounceOptions = {},
): UseHeroScrollBounceResult {
  const { threshold = 24, maxBounces = 1 } = options;
  const lenis = useLenis();
  const [visible, setVisible] = useState(true);
  const bounceCountRef = useRef(0);
  const isReturningRef = useRef(false);
  const dismissedRef = useRef(false);

  const completeReturn = useCallback(() => {
    isReturningRef.current = false;
  }, []);

  const returnToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { onComplete: completeReturn });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    const onScroll = () => {
      if (window.scrollY <= 0) {
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(fallbackTimer);
        completeReturn();
      }
    };

    // Smooth scroll may not emit a final scrollY===0 event in all browsers.
    const fallbackTimer = window.setTimeout(() => {
      window.removeEventListener("scroll", onScroll);
      completeReturn();
    }, 800);

    window.addEventListener("scroll", onScroll, { passive: true });
  }, [lenis, completeReturn]);

  const handleScroll = useCallback(
    (scrollY: number) => {
      if (dismissedRef.current || isReturningRef.current) {
        return;
      }

      if (scrollY <= threshold) {
        return;
      }

      if (prefersReducedMotion()) {
        return;
      }

      if (bounceCountRef.current >= maxBounces) {
        return;
      }

      bounceCountRef.current += 1;
      isReturningRef.current = true;

      // Hide tip once bounce budget is consumed (matches dismiss path).
      if (bounceCountRef.current >= maxBounces) {
        setVisible(false);
      }

      returnToTop();
    },
    [maxBounces, returnToTop, threshold],
  );

  const dismiss = useCallback(() => {
    dismissedRef.current = true;
    setVisible(false);
  }, []);

  useEffect(() => {
    if (lenis) {
      const onScroll = () => {
        handleScroll(lenis.scroll);
      };

      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }

    const onScroll = () => {
      handleScroll(window.scrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll, lenis]);

  return { visible, dismiss };
}
