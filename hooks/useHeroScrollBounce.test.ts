import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  prefersReducedMotionMock,
  scrollToMock,
  stopMock,
  startMock,
  lenisOnMock,
  lenisOffMock,
  mockLenis,
  useLenisMock,
} = vi.hoisted(() => {
  const scrollToMock = vi.fn(
    (_target: number, opts?: { onComplete?: () => void }) => {
      opts?.onComplete?.();
    },
  );
  const stopMock = vi.fn();
  const startMock = vi.fn();
  const lenisOnMock = vi.fn();
  const lenisOffMock = vi.fn();
  const mockLenis = {
    scroll: 0,
    scrollTo: scrollToMock,
    stop: stopMock,
    start: startMock,
    on: lenisOnMock,
    off: lenisOffMock,
  };
  const useLenisMock = vi.fn(() => mockLenis as typeof mockLenis | undefined);
  const prefersReducedMotionMock = vi.fn(() => false);

  return {
    prefersReducedMotionMock,
    scrollToMock,
    stopMock,
    startMock,
    lenisOnMock,
    lenisOffMock,
    mockLenis,
    useLenisMock,
  };
});

vi.mock("lenis/react", () => ({
  useLenis: () => useLenisMock(),
}));

vi.mock("@/lib/motion/reduced-motion", () => ({
  prefersReducedMotion: () => prefersReducedMotionMock(),
}));

import { useHeroScrollBounce } from "./useHeroScrollBounce";

function getLenisScrollHandler(): () => void {
  const call = lenisOnMock.mock.calls.find(([event]) => event === "scroll");
  if (!call) {
    throw new Error("No lenis scroll handler registered");
  }
  return call[1] as () => void;
}

function markUserWheel() {
  window.dispatchEvent(new Event("wheel"));
}

describe("useHeroScrollBounce", () => {
  const windowScrollToMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    prefersReducedMotionMock.mockReturnValue(false);
    mockLenis.scroll = 0;
    useLenisMock.mockReturnValue(mockLenis);
    vi.stubGlobal("scrollTo", windowScrollToMock);
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

  it("user wheel past threshold invokes return-to-top via lenis and hides tip", () => {
    const { result } = renderHook(() =>
      useHeroScrollBounce({ threshold: 24, maxBounces: 1 }),
    );

    act(() => {
      markUserWheel();
      mockLenis.scroll = 30;
      getLenisScrollHandler()();
    });

    expect(stopMock).toHaveBeenCalled();
    expect(scrollToMock).toHaveBeenCalledWith(
      0,
      expect.objectContaining({
        force: true,
        onComplete: expect.any(Function),
      }),
    );
    expect(startMock).toHaveBeenCalled();
    expect(result.current.visible).toBe(false);
  });

  it("after max bounces, further user scrolls do not return to top", () => {
    scrollToMock.mockImplementation(
      (_target: number, opts?: { onComplete?: () => void }) => {
        void opts;
      },
    );

    renderHook(() => useHeroScrollBounce({ threshold: 24, maxBounces: 1 }));

    act(() => {
      markUserWheel();
      mockLenis.scroll = 30;
      getLenisScrollHandler()();
    });
    expect(scrollToMock).toHaveBeenCalledTimes(1);

    const onComplete = scrollToMock.mock.calls[0]![1]?.onComplete;
    act(() => {
      onComplete?.();
    });

    scrollToMock.mockClear();
    act(() => {
      markUserWheel();
      mockLenis.scroll = 50;
      getLenisScrollHandler()();
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("does not auto-hijack scroll when reduced motion is preferred", () => {
    prefersReducedMotionMock.mockReturnValue(true);

    renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    act(() => {
      markUserWheel();
      mockLenis.scroll = 30;
      getLenisScrollHandler()();
    });

    expect(scrollToMock).not.toHaveBeenCalled();
    expect(windowScrollToMock).not.toHaveBeenCalled();
  });

  it("dismiss hides tip and prevents bounce", () => {
    const { result } = renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.visible).toBe(false);

    act(() => {
      markUserWheel();
      mockLenis.scroll = 30;
      getLenisScrollHandler()();
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("falls back to window scroll when lenis is unavailable", () => {
    useLenisMock.mockReturnValue(undefined);

    renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: 30,
    });

    act(() => {
      markUserWheel();
      window.dispatchEvent(new Event("scroll"));
    });

    expect(windowScrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("programmatic scroll alone does not trigger bounce", () => {
    renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    act(() => {
      mockLenis.scroll = 80;
      getLenisScrollHandler()();
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("cleans up lenis scroll listener and return settle timer on unmount", () => {
    scrollToMock.mockImplementation(() => {
      // Leave return in-flight (no onComplete).
    });
    const clearTimeoutSpy = vi.spyOn(window, "clearTimeout");

    const { unmount } = renderHook(() =>
      useHeroScrollBounce({ threshold: 24 }),
    );

    const handler = getLenisScrollHandler();

    act(() => {
      markUserWheel();
      mockLenis.scroll = 30;
      handler();
    });

    unmount();

    expect(lenisOffMock).toHaveBeenCalledWith("scroll", handler);
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
