"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import "./TiltedCard.css";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

/** Sensible defaults when wrapping marketing UI cards (not demo image cards). */
export const marketingCardTiltProps = {
  containerHeight: "100%",
  containerWidth: "100%",
  scaleOnHover: 1.03,
  rotateAmplitude: 10,
  showMobileWarning: false,
  showTooltip: false,
} as const;

export type TiltedCardProps = {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  children?: ReactNode;
  className?: string;
};

/**
 * React Bits TiltedCard — 3D mouse-follow tilt with spring physics.
 * Use `imageSrc` for the classic image card, or `children` to wrap any card UI.
 */
export function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  children,
  className = "",
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isContentMode = Boolean(children);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: MouseEvent<HTMLElement>) {
    if (reduceMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (reduceMotion) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  const figureClassName = [
    "tilted-card-figure",
    isContentMode ? "tilted-card-figure--content" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const innerStyle: CSSProperties = isContentMode
    ? { width: "100%" }
    : { width: imageWidth, height: imageHeight };

  return (
    <figure
      ref={ref}
      className={figureClassName}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning ? (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      ) : null}

      <motion.div
        className={[
          "tilted-card-inner",
          isContentMode ? "tilted-card-inner--content" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          ...innerStyle,
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          scale: reduceMotion ? 1 : scale,
        }}
      >
        {children ? (
          <div className="tilted-card-body">{children}</div>
        ) : imageSrc ? (
          <motion.img
            src={imageSrc}
            alt={altText}
            className="tilted-card-img"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        ) : null}

        {displayOverlayContent && overlayContent ? (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        ) : null}
      </motion.div>

      {showTooltip ? (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity: reduceMotion ? 0 : opacity,
            rotate: reduceMotion ? 0 : rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      ) : null}
    </figure>
  );
}

export default TiltedCard;
