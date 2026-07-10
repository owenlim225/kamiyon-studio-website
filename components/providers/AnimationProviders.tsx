"use client";

import type { ReactNode } from "react";

import { SmoothScrollProvider } from "./SmoothScrollProvider";

type AnimationProvidersProps = {
  children: ReactNode;
};

/**
 * Frontend-only animation stack. Keep out of `app/(payload)/layout.tsx`.
 */
export function AnimationProviders({ children }: AnimationProvidersProps) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
