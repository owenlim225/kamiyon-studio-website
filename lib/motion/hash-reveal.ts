import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Force-complete ScrollTrigger reveals whose trigger contains `el`.
 * Needed when in-page hash links land inside AnimatedSection wrappers
 * that start at autoAlpha:0 until the trigger fires.
 */
export function revealScrollTriggeredAncestors(el: HTMLElement): void {
  ensureGsapPlugins();

  for (const st of ScrollTrigger.getAll()) {
    if (!(st.trigger instanceof Element) || !st.trigger.contains(el)) {
      continue;
    }

    st.animation?.progress(1);
    gsap.set(st.trigger, { autoAlpha: 1, y: 0 });
  }
}
