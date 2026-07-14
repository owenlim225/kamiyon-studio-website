"use client";

import { useRef, type RefObject } from "react";

import {
  gsap,
  GSAP_ALLOW_MOTION,
  GSAP_REDUCE_MOTION,
} from "@/lib/gsap";
import { MOTION_DURATION, MOTION_EASE, MOTION_STAGGER } from "@/lib/motion/constants";
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
 * Il Capo–inspired home opening: curtain wipe → brand → list stagger.
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
      const brand = root.querySelector("[data-hero-brand]");
      const headline = root.querySelector("[data-hero-headline]");
      const support = root.querySelector("[data-hero-support]");
      const cta = root.querySelector("[data-hero-cta]");
      const corners = gsap.utils.toArray<Element>(
        root.querySelectorAll("[data-opening-corner]"),
      );
      const rows = gsap.utils.toArray<Element>(
        root.querySelectorAll("[data-opening-row]"),
      );

      const mm = gsap.matchMedia();

      mm.add(GSAP_REDUCE_MOTION, () => {
        if (curtain) {
          gsap.set(curtain, { autoAlpha: 0, yPercent: -100 });
        }
        gsap.set(
          [brand, headline, support, cta, ...corners, ...rows].filter(Boolean),
          { autoAlpha: 1, y: 0, clearProps: "clipPath" },
        );
      });

      mm.add(GSAP_ALLOW_MOTION, () => {
        if (curtain) {
          // Override the no-JS off-screen fallback, then wipe upward like Il Capo's loader.
          gsap.set(curtain, { yPercent: 0 });
        }
        if (brand) {
          gsap.set(brand, { autoAlpha: 0, y: 24 });
        }
        if (headline) {
          gsap.set(headline, { autoAlpha: 0, y: 32 });
        }
        if (support) {
          gsap.set(support, { autoAlpha: 0, y: 20 });
        }
        if (cta) {
          gsap.set(cta, { autoAlpha: 0, y: 16 });
        }
        if (corners.length) {
          gsap.set(corners, { autoAlpha: 0, y: -12 });
        }
        if (rows.length) {
          gsap.set(rows, { autoAlpha: 0, y: 28 });
        }

        const tl = gsap.timeline({
          defaults: { ease: MOTION_EASE.soft },
        });

        if (curtain) {
          tl.to(curtain, {
            yPercent: -100,
            duration: MOTION_DURATION.slow,
            ease: MOTION_EASE.inOut,
          });
        }

        if (corners.length) {
          tl.to(
            corners,
            {
              autoAlpha: 1,
              y: 0,
              duration: MOTION_DURATION.fast,
              stagger: MOTION_STAGGER.tight,
            },
            curtain ? "-=0.35" : 0,
          );
        }

        if (brand) {
          tl.to(
            brand,
            { autoAlpha: 1, y: 0, duration: MOTION_DURATION.base },
            "-=0.2",
          );
        }

        if (headline) {
          tl.to(
            headline,
            { autoAlpha: 1, y: 0, duration: MOTION_DURATION.hero },
            "-=0.45",
          );
        }

        if (support) {
          tl.to(
            support,
            { autoAlpha: 1, y: 0, duration: MOTION_DURATION.base },
            "-=0.7",
          );
        }

        if (cta) {
          tl.to(
            cta,
            { autoAlpha: 1, y: 0, duration: MOTION_DURATION.fast },
            "-=0.55",
          );
        }

        if (rows.length) {
          tl.to(
            rows,
            {
              autoAlpha: 1,
              y: 0,
              duration: MOTION_DURATION.base,
              stagger: MOTION_STAGGER.base,
              ease: "expo.out",
            },
            "-=0.35",
          );
        }
      });
    },
    [merged.autoplay, merged.disabled],
  );

  return ref;
}
