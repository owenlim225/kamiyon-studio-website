"use client";

import { useRef, type RefObject } from "react";

import {
  gsap,
  GSAP_ALLOW_MOTION,
  GSAP_REDUCE_MOTION,
} from "@/lib/gsap";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion/constants";
import type {
  HeroAnimationOptions,
  MotionElementRef,
} from "@/lib/motion/types";

import { useGsapContext } from "./useGsapContext";

const defaults: Required<HeroAnimationOptions> = {
  autoplay: true,
  disabled: false,
  brandSelector: "[data-hero-brand]",
  headlineSelector: "[data-hero-headline]",
  ctaSelector: "[data-hero-cta]",
};

export function useHeroAnimation<T extends HTMLElement = HTMLElement>(
  options: HeroAnimationOptions = {},
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

      const brand = root.querySelector(merged.brandSelector);
      const headline = root.querySelector(merged.headlineSelector);
      const cta = root.querySelector(merged.ctaSelector);
      const targets = [brand, headline, cta].filter(
        (node): node is Element => node != null,
      );

      if (targets.length === 0) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(GSAP_REDUCE_MOTION, () => {
        gsap.set(targets, { autoAlpha: 1, y: 0 });
      });

      mm.add(GSAP_ALLOW_MOTION, () => {
        // Set from-state before paint so the hero does not flash fully visible.
        if (brand) {
          gsap.set(brand, { autoAlpha: 0, y: 20 });
        }
        if (headline) {
          gsap.set(headline, { autoAlpha: 0, y: 28 });
        }
        if (cta) {
          gsap.set(cta, { autoAlpha: 0, y: 16 });
        }

        const tl = gsap.timeline({ defaults: { ease: MOTION_EASE.soft } });

        if (brand) {
          tl.to(brand, {
            autoAlpha: 1,
            y: 0,
            duration: MOTION_DURATION.base,
          });
        }

        if (headline) {
          tl.to(
            headline,
            {
              autoAlpha: 1,
              y: 0,
              duration: MOTION_DURATION.hero,
            },
            "-=0.35",
          );
        }

        if (cta) {
          tl.to(
            cta,
            {
              autoAlpha: 1,
              y: 0,
              duration: MOTION_DURATION.fast,
            },
            "-=0.45",
          );
        }
      });
    },
    [
      merged.autoplay,
      merged.disabled,
      merged.brandSelector,
      merged.headlineSelector,
      merged.ctaSelector,
    ],
  );

  return ref;
}
