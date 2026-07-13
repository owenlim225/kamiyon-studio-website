import { beforeEach, describe, expect, it, vi } from "vitest";

const progress = vi.fn();
const gsapSet = vi.fn();
const getAll = vi.fn();

vi.mock("@/lib/gsap", () => ({
  ensureGsapPlugins: vi.fn(),
  gsap: {
    set: (...args: unknown[]) => gsapSet(...args),
  },
  ScrollTrigger: {
    getAll: () => getAll(),
  },
}));

import { revealScrollTriggeredAncestors } from "./hash-reveal";

describe("revealScrollTriggeredAncestors", () => {
  beforeEach(() => {
    progress.mockReset();
    gsapSet.mockReset();
    getAll.mockReset();
  });

  it("completes ScrollTriggers whose trigger contains the hash target", () => {
    const wrapper = document.createElement("div");
    const target = document.createElement("section");
    target.id = "values";
    wrapper.appendChild(target);
    document.body.appendChild(wrapper);

    getAll.mockReturnValue([
      {
        trigger: wrapper,
        animation: { progress },
      },
      {
        trigger: document.createElement("div"),
        animation: { progress: vi.fn() },
      },
    ]);

    revealScrollTriggeredAncestors(target);

    expect(progress).toHaveBeenCalledWith(1);
    expect(gsapSet).toHaveBeenCalledWith(wrapper, { autoAlpha: 1, y: 0 });

    wrapper.remove();
  });

  it("no-ops when no ScrollTrigger contains the target", () => {
    const target = document.createElement("section");
    document.body.appendChild(target);
    getAll.mockReturnValue([]);

    revealScrollTriggeredAncestors(target);

    expect(gsapSet).not.toHaveBeenCalled();
    target.remove();
  });
});
