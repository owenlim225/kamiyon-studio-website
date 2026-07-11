"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

import {
  ensureGsapPlugins,
  gsap,
  refreshScrollTrigger,
  ScrollTrigger,
} from "@/lib/gsap";
import { revealScrollTriggeredAncestors } from "@/lib/motion/hash-reveal";
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

function focusHashTarget(hash: string): void {
  if (!hash || hash === "#") {
    return;
  }

  const el = document.querySelector(hash);
  if (!(el instanceof HTMLElement)) {
    return;
  }

  // Hash CTAs (e.g. About #values / #team) may land inside AnimatedSection
  // wrappers that start at autoAlpha:0 until ScrollTrigger plays.
  revealScrollTriggeredAncestors(el);

  if (!el.hasAttribute("tabindex")) {
    el.tabIndex = -1;
  }

  el.focus({ preventScroll: true });
}

/** Last in-page hash clicked — Lenis may finish scroll before location.hash settles. */
let pendingAnchorHash: string | null = null;

function rememberAnchorHash(event: MouseEvent): void {
  const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
  if (!(link instanceof HTMLAnchorElement)) {
    return;
  }

  const href = link.getAttribute("href");
  if (!href || href === "#") {
    return;
  }

  pendingAnchorHash = href;
}

/**
 * When Lenis is off (reduced motion), restore skip-link / in-page anchor focus
 * after the native hash scroll.
 */
function NativeHashFocus() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      rememberAnchorHash(event);
      const href = pendingAnchorHash;
      if (!href) {
        return;
      }

      requestAnimationFrame(() => {
        focusHashTarget(href);
        pendingAnchorHash = null;
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

function LenisAnchorFocusCapture() {
  useEffect(() => {
    document.addEventListener("click", rememberAnchorHash, true);
    return () => document.removeEventListener("click", rememberAnchorHash, true);
  }, []);

  return null;
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
    return (
      <>
        <NativeHashFocus />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        // Lenis intercepts hash links by default; enable + focus target for skip-link a11y.
        anchors: {
          onComplete: () => {
            focusHashTarget(pendingAnchorHash ?? window.location.hash);
            pendingAnchorHash = null;
          },
        },
        stopInertiaOnNavigate: true,
      }}
    >
      <LenisGsapBridge />
      <LenisAnchorFocusCapture />
      {children}
    </ReactLenis>
  );
}
