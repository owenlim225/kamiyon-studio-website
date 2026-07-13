"use client";

import {
  useLayoutEffect,
  type DependencyList,
  type RefObject,
} from "react";

import { ensureGsapPlugins, gsap } from "@/lib/gsap";

type ScopeRef = RefObject<Element | null>;

/**
 * Shared GSAP context + cleanup primitive for React effects.
 * Prefer this over ad-hoc useLayoutEffect + gsap.context in feature hooks.
 */
export function useGsapContext(
  scope: ScopeRef,
  createAnimations: () => void,
  deps: DependencyList = [],
): void {
  useLayoutEffect(() => {
    const element = scope.current;
    if (!element) {
      return;
    }

    ensureGsapPlugins();
    const ctx = gsap.context(createAnimations, element);

    return () => {
      ctx.revert();
    };
    // Caller controls dependency identity; mirrors React's exhaustive-deps opt-out for effect factories.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps provided by caller
  }, deps);
}
