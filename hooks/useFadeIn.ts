"use client";

import { useRef, type RefObject } from "react";

import {
  createScrollTriggerDefaults,
  gsap,
  GSAP_ALLOW_MOTION,
  GSAP_REDUCE_MOTION,
} from "@/lib/gsap";
import { attachScrollVelocityBlur } from "@/lib/motion/attach-velocity-blur";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
} from "@/lib/motion/constants";
import {
  MOTION_BLUR,
  formatBlurFilter,
} from "@/lib/motion/motion-blur";
import type { FadeInOptions, MotionElementRef } from "@/lib/motion/types";

import { useGsapContext } from "./useGsapContext";

const defaults: Required<
  Pick<
    FadeInOptions,
    "delay" | "duration" | "y" | "once" | "disabled" | "motionBlur" | "enterBlur"
  >
> = {
  delay: 0,
  duration: MOTION_DURATION.base,
  y: MOTION_DISTANCE.fadeY,
  once: true,
  disabled: false,
  motionBlur: true,
  enterBlur: MOTION_BLUR.enter,
};

/**
 * Soft fade-up on enter-viewport.
 * When `motionBlur` is on (default): enter from a soft blur, then apply
 * velocity-linked blur while the element stays / passes through the viewport.
 */
export function useFadeIn<T extends HTMLElement = HTMLElement>(
  options: FadeInOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const merged = { ...defaults, ...options };

  useGsapContext(
    ref as MotionElementRef,
    () => {
      const el = ref.current;
      if (!el || merged.disabled) {
        return;
      }

      const mm = gsap.matchMedia();
      const trigger = merged.trigger ?? el;

      mm.add(GSAP_REDUCE_MOTION, () => {
        gsap.set(el, { autoAlpha: 1, y: 0, clearProps: "filter" });
      });

      mm.add(GSAP_ALLOW_MOTION, () => {
        const blurEnabled = merged.motionBlur;
        const enterFilter = blurEnabled
          ? formatBlurFilter(merged.enterBlur)
          : undefined;
        const clearFilter = blurEnabled ? formatBlurFilter(0) : undefined;

        // immediateRender (default true): apply from-state when the tween is
        // created so below-fold content stays hidden until ScrollTrigger plays.
        gsap.fromTo(
          el,
          {
            autoAlpha: 0,
            y: merged.y,
            ...(enterFilter ? { filter: enterFilter } : {}),
          },
          {
            autoAlpha: 1,
            y: 0,
            ...(clearFilter ? { filter: clearFilter } : {}),
            duration: merged.duration,
            delay: merged.delay,
            ease: MOTION_EASE.out,
            scrollTrigger: createScrollTriggerDefaults({
              trigger,
              start: merged.start,
              once: merged.once,
            }),
          },
        );
      });

      // Velocity blur while on-screen — fine pointers only (touch scroll is noisy).
      if (merged.motionBlur) {
        mm.add(`${GSAP_ALLOW_MOTION} and (pointer: fine)`, () => {
          attachScrollVelocityBlur(el, trigger);
        });
      }
    },
    [
      merged.delay,
      merged.duration,
      merged.y,
      merged.once,
      merged.disabled,
      merged.start,
      merged.trigger,
      merged.motionBlur,
      merged.enterBlur,
    ],
  );

  return ref;
}
