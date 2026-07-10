"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/Button";

type ButtonProps = ComponentPropsWithoutRef<typeof Button>;

type MotionButtonProps = ButtonProps & {
  children: ReactNode;
};

/**
 * Framer Motion micro-interaction wrapper around the design-system Button.
 * Hover/tap scale only — no scroll, viewport, or page-transition motion.
 */
export function MotionButton({ children, className = "", ...props }: MotionButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="inline-flex"
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.span>
  );
}
