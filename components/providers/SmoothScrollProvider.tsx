"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

import {
  ensureGsapPlugins,
  gsap,
  refreshScrollTrigger,
  ScrollTrigger,
} from "@/lib/gsap";
import { REDUCED_MOTION_QUERY } from "@/lib/motion/reduced-motion";

import "lenis/dist/lenis.css";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

function subscribeReducedMotion(onStoreChange: () => void): () => void {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Skip Lenis during SSR/hydration so markup stays stable. */
function getReducedMotionServerSnapshot(): boolean {
  return true;
}

/**
 * Bridges an existing Lenis instance to GSAP ticker + ScrollTrigger.
 * Mounted only as a child of ReactLenis so useLenis() resolves.
 */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      return;
    }

    ensureGsapPlugins();

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => {
      refreshScrollTrigger();
    };

    if (document.fonts?.ready) {
      void document.fonts.ready.then(onLoad);
    }

    window.addEventListener("load", onLoad);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [lenis]);

  return null;
}

/**
 * Document-level Lenis smooth scroll synced to GSAP's ticker + ScrollTrigger.
 * Skips Lenis entirely when prefers-reduced-motion is set (native scroll).
 * Does not kill page-owned ScrollTriggers on unmount — hooks own those.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
