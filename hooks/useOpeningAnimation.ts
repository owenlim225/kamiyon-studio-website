"use client";

import { useRef, type RefObject } from "react";

import {
  gsap,
  GSAP_ALLOW_MOTION,
  GSAP_REDUCE_MOTION,
} from "@/lib/gsap";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion/constants";
import type { MotionElementRef } from "@/lib/motion/types";

import { useGsapContext } from "./useGsapContext";

export type OpeningAnimationOptions = {
  autoplay?: boolean;
  disabled?: boolean;
};

const defaults: Required<OpeningAnimationOptions> = {
  autoplay: true,
  disabled: false,
};

/**
 * Home opening curtain wipe. Title letter motion is owned by SplitText.
 * Respects prefers-reduced-motion via GSAP matchMedia.
 */
export function useOpeningAnimation<T extends HTMLElement = HTMLElement>(
  options: OpeningAnimationOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const merged = { ...defaults, ...options };

  useGsapContext(
    ref as MotionElementRef,
    () => {
      const root = ref.current;
      if (!root || merged.disabled || !merged.autoplay) {
        return;
      }

      const curtain = root.querySelector("[data-opening-curtain]");
      if (!curtain) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(GSAP_REDUCE_MOTION, () => {
        gsap.set(curtain, { autoAlpha: 0, yPercent: -100 });
      });

      mm.add(GSAP_ALLOW_MOTION, () => {
        gsap.set(curtain, { yPercent: 0 });

        gsap.to(curtain, {
          yPercent: -100,
          duration: MOTION_DURATION.slow,
          ease: MOTION_EASE.inOut,
        });
      });
    },
    [merged.autoplay, merged.disabled],
  );

  return ref;
}
