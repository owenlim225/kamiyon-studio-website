import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { prefersReducedMotionMock, scrollToMock } = vi.hoisted(() => {
  const scrollToMock = vi.fn();
  const prefersReducedMotionMock = vi.fn(() => false);
  return { prefersReducedMotionMock, scrollToMock };
});

vi.mock("@/lib/motion/reduced-motion", () => ({
  prefersReducedMotion: () => prefersReducedMotionMock(),
}));

import { useHeroScrollBounce } from "./useHeroScrollBounce";

function markUserWheel() {
  window.dispatchEvent(new Event("wheel"));
}

describe("useHeroScrollBounce", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prefersReducedMotionMock.mockReturnValue(false);
    vi.stubGlobal("scrollTo", scrollToMock);
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns visible true initially", () => {
    const { result } = renderHook(() => useHeroScrollBounce());
    expect(result.current.visible).toBe(true);
  });

  it("user wheel past threshold invokes return-to-top and hides tip", () => {
    const { result } = renderHook(() =>
      useHeroScrollBounce({ threshold: 24, maxBounces: 1 }),
    );

    act(() => {
      markUserWheel();
      Object.defineProperty(window, "scrollY", {
        configurable: true,
        writable: true,
        value: 30,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
    expect(result.current.visible).toBe(false);
  });

  it("does not auto-hijack scroll when reduced motion is preferred", () => {
    prefersReducedMotionMock.mockReturnValue(true);

    renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    act(() => {
      markUserWheel();
      Object.defineProperty(window, "scrollY", {
        configurable: true,
        writable: true,
        value: 30,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("dismiss hides tip and prevents bounce", () => {
    const { result } = renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.visible).toBe(false);

    act(() => {
      markUserWheel();
      Object.defineProperty(window, "scrollY", {
        configurable: true,
        writable: true,
        value: 30,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("programmatic scroll alone does not trigger bounce", () => {
    renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    act(() => {
      Object.defineProperty(window, "scrollY", {
        configurable: true,
        writable: true,
        value: 80,
      });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });
});
