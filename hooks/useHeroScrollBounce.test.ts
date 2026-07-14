import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const {
  prefersReducedMotionMock,
  scrollToMock,
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
  const lenisOnMock = vi.fn();
  const lenisOffMock = vi.fn();
  const mockLenis = {
    scroll: 0,
    scrollTo: scrollToMock,
    on: lenisOnMock,
    off: lenisOffMock,
  };
  const useLenisMock = vi.fn(() => mockLenis as typeof mockLenis | undefined);
  const prefersReducedMotionMock = vi.fn(() => false);

  return {
    prefersReducedMotionMock,
    scrollToMock,
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

  it("scroll past threshold invokes return-to-top via lenis and hides tip", () => {
    const { result } = renderHook(() =>
      useHeroScrollBounce({ threshold: 24, maxBounces: 1 }),
    );

    mockLenis.scroll = 30;
    act(() => {
      getLenisScrollHandler()();
    });

    expect(scrollToMock).toHaveBeenCalledWith(
      0,
      expect.objectContaining({
        onComplete: expect.any(Function),
      }),
    );
    expect(result.current.visible).toBe(false);
  });

  it("after max bounces, further scrolls do not return to top", () => {
    scrollToMock.mockImplementation(
      (_target: number, opts?: { onComplete?: () => void }) => {
        // defer completion so re-entrancy lock is observable
        void opts;
      },
    );

    renderHook(() => useHeroScrollBounce({ threshold: 24, maxBounces: 1 }));

    mockLenis.scroll = 30;
    act(() => {
      getLenisScrollHandler()();
    });
    expect(scrollToMock).toHaveBeenCalledTimes(1);

    const onComplete = scrollToMock.mock.calls[0]![1]?.onComplete;
    act(() => {
      onComplete?.();
    });

    scrollToMock.mockClear();
    mockLenis.scroll = 50;
    act(() => {
      getLenisScrollHandler()();
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("does not auto-hijack scroll when reduced motion is preferred", () => {
    prefersReducedMotionMock.mockReturnValue(true);

    renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    mockLenis.scroll = 30;
    act(() => {
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

    mockLenis.scroll = 30;
    act(() => {
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
      window.dispatchEvent(new Event("scroll"));
    });

    expect(windowScrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("cleans up lenis scroll listener on unmount", () => {
    const { unmount } = renderHook(() => useHeroScrollBounce());

    const handler = getLenisScrollHandler();
    unmount();

    expect(lenisOffMock).toHaveBeenCalledWith("scroll", handler);
  });
});
