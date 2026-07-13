"use client";

import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";
import { MOTION_DURATION } from "@/lib/motion/constants";

type AnimatedImageBaseProps = {
  className?: string;
  wrapperClassName?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  disabled?: boolean;
};

type AnimatedImageWithChild = AnimatedImageBaseProps & {
  children: ReactNode;
};

type AnimatedImageWithSrc = AnimatedImageBaseProps &
  Omit<ImageProps, "className"> & {
    children?: undefined;
  };

type AnimatedImageProps = AnimatedImageWithChild | AnimatedImageWithSrc;

/**
 * Reveal + fade wrapper. Pass next/image props directly, or a custom child
 * via `children`.
 */
export function AnimatedImage(props: AnimatedImageProps) {
  const {
    className = "",
    wrapperClassName = "",
    delay = 0,
    duration = MOTION_DURATION.slow,
    once = true,
    disabled = false,
    children,
    ...rest
  } = props;

  const ref = useReveal<HTMLDivElement>({
    delay,
    duration,
    direction: "up",
    once,
    disabled,
  });

  // #region agent log
  if (!children) {
    fetch('http://127.0.0.1:7808/ingest/5870b4a9-8a44-420f-bfd4-f6f4bc6fae2d',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'dd617c'},body:JSON.stringify({sessionId:'dd617c',location:'AnimatedImage.tsx:render',message:'AnimatedImage Image branch',data:{hasAlt:typeof (rest as ImageProps).alt==='string',restKeys:Object.keys(rest)},timestamp:Date.now(),hypothesisId:'H1',runId:'post-fix'})}).catch(()=>{});
  }
  // #endregion

  return (
    <div ref={ref} className={`overflow-hidden ${wrapperClassName}`.trim()}>
      {children ?? (
        <Image
          className={`will-change-transform ${className}`.trim()}
          {...(rest as ImageProps)}
        />
      )}
    </div>
  );
}
