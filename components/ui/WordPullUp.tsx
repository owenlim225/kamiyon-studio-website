"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";

type WordPullUpTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

type WordPullUpProps = {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
  as?: WordPullUpTag;
  id?: string;
  /**
   * When true (default), animate when the heading scrolls into view.
   * Set false for above-the-fold / mount-time entrances.
   */
  startOnView?: boolean;
};

const defaultWrapperVariants = (staggerChildren: number): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren,
    },
  },
});

const defaultWordVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

/**
 * Standard marketing heading entrance: words pull up with a stagger.
 * Pair with `AnimatedSection` / `useFadeIn` for body copy fade-in on scroll.
 */
function WordPullUp({
  words,
  delayMultiple = 0.12,
  wrapperFramerProps,
  framerProps = defaultWordVariants,
  className,
  as: Tag = "h1",
  id,
  startOnView = true,
}: WordPullUpProps) {
  const reduceMotion = useReducedMotion();
  const wrapperVariants =
    wrapperFramerProps ?? defaultWrapperVariants(delayMultiple);

  const classNames = cn(
    "font-display font-bold tracking-[-0.02em] text-[var(--text-primary)]",
    className,
  );

  if (reduceMotion) {
    return (
      <Tag id={id} className={classNames}>
        {words}
      </Tag>
    );
  }

  const MotionTag = motion[Tag] as typeof motion.h1;
  const viewProps: Pick<
    HTMLMotionProps<"h1">,
    "animate" | "whileInView" | "viewport"
  > = startOnView
    ? {
        whileInView: "show",
        viewport: { once: true, amount: 0.35 },
      }
    : { animate: "show" };

  return (
    <MotionTag
      id={id}
      variants={wrapperVariants}
      initial="hidden"
      {...viewProps}
      className={classNames}
    >
      {words.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "0.35em" }}
        >
          {word === "" ? "\u00a0" : word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export { WordPullUp };
export type { WordPullUpProps, WordPullUpTag };
