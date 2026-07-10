"use client";

import type { ReactNode, RefObject } from "react";

import { useStagger } from "@/hooks/useStagger";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_STAGGER,
} from "@/lib/motion/constants";

type AnimatedTextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";

type AnimatedTextProps = {
  children: ReactNode;
  className?: string;
  as?: AnimatedTextTag;
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
  once?: boolean;
  disabled?: boolean;
};

/**
 * Staggers direct child nodes (prefer wrapping words/lines as spans).
 * Avoids a heavy text-split library for v1.
 */
export function AnimatedText({
  children,
  className = "",
  as: Tag = "p",
  delay = 0,
  duration = MOTION_DURATION.base,
  stagger = MOTION_STAGGER.tight,
  y = MOTION_DISTANCE.staggerY,
  once = true,
  disabled = false,
}: AnimatedTextProps) {
  const ref = useStagger<HTMLElement>({
    delay,
    duration,
    stagger,
    y,
    once,
    disabled,
  });

  return (
    <Tag ref={ref as RefObject<HTMLParagraphElement | null>} className={className}>
      {children}
    </Tag>
  );
}
