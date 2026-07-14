import type { RefObject } from "react";

export type MotionElementRef = RefObject<HTMLElement | null>;

export type BaseMotionOptions = {
  delay?: number;
  duration?: number;
  disabled?: boolean;
  /** When true, play once then kill the ScrollTrigger (animation keeps end state). */
  once?: boolean;
  /** ScrollTrigger start position; defaults to shared constant. */
  start?: string;
  /** Explicit trigger element; defaults to the animated element. */
  trigger?: Element | string | null;
};

export type FadeInOptions = BaseMotionOptions & {
  y?: number;
  /**
   * Cinematic blur while entering / scrolling past the viewport.
   * Off under reduced motion and coarse pointers (handled in the hook).
   */
  motionBlur?: boolean;
  /** Starting blur radius (px) for the enter tween. */
  enterBlur?: number;
};

export type RevealDirection = "up" | "down" | "left" | "right";

export type RevealOptions = BaseMotionOptions & {
  direction?: RevealDirection;
  /** Soft enter blur + velocity blur while scrolling past (default on). */
  motionBlur?: boolean;
  enterBlur?: number;
};

export type StaggerOptions = BaseMotionOptions & {
  stagger?: number;
  y?: number;
  from?: "start" | "center" | "end" | "edges" | "random" | number;
  /** Child selector within the scope; defaults to direct children. */
  childSelector?: string;
  /** Soft enter blur + velocity blur while scrolling past (default on). */
  motionBlur?: boolean;
  enterBlur?: number;
};

export type ParallaxOptions = {
  speed?: number;
  disabled?: boolean;
  trigger?: Element | string | null;
  /** Scrub smoothness; `true` = immediate, number = lag in seconds. */
  scrub?: boolean | number;
};

export type HeroAnimationOptions = {
  autoplay?: boolean;
  disabled?: boolean;
  brandSelector?: string;
  headlineSelector?: string;
  ctaSelector?: string;
};
