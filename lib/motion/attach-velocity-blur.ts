"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";

import {
  MOTION_BLUR,
  formatBlurFilter,
  velocityToBlurPx,
} from "./motion-blur";

/**
 * Velocity-linked filter blur while `trigger` occupies the viewport.
 * Cleared when the element leaves either edge. Pair with enter-tween blur.
 */
export function attachScrollVelocityBlur(
  el: HTMLElement,
  trigger: Element | string,
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      const blur = velocityToBlurPx(self.getVelocity());
      gsap.to(el, {
        filter: formatBlurFilter(blur),
        duration: MOTION_BLUR.lag,
        ease: "power1.out",
        overwrite: "auto",
      });
    },
    onLeave: () => {
      gsap.set(el, { filter: formatBlurFilter(0) });
    },
    onLeaveBack: () => {
      gsap.set(el, { filter: formatBlurFilter(0) });
    },
  });
}
