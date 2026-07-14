"use client";

import { useCallback, useEffect, useState } from "react";

import { LineSidebar } from "@/components/ui/LineSidebar";
import { HOME_SECTION_NAV } from "@/lib/home/section-nav";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

const SECTION_LABELS = HOME_SECTION_NAV.map((item) => item.label);

export function HomeLineSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = useCallback((index: number) => {
    const targetId = HOME_SECTION_NAV[index]?.id;
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const sections = HOME_SECTION_NAV.map(({ id }) =>
      document.getElementById(id)
    ).filter((element): element is HTMLElement => element != null);

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = sections[0].id;
        let bestRatio = -1;

        for (const section of sections) {
          const ratio = ratios.get(section.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = section.id;
          }
        }

        const nextIndex = HOME_SECTION_NAV.findIndex(
          (item) => item.id === bestId
        );
        if (nextIndex >= 0) {
          setActiveIndex(nextIndex);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Page sections"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="pointer-events-auto">
        <LineSidebar
          items={SECTION_LABELS}
          accentColor="var(--color-sakura)"
          textColor="var(--text-muted)"
          markerColor="var(--text-secondary)"
          showIndex
          showMarker
          proximityRadius={100}
          maxShift={24}
          falloff="smooth"
          markerLength={48}
          markerGap={0}
          tickScale={0.5}
          scaleTick
          itemGap={16}
          fontSize={0.95}
          smoothing={100}
          activeIndex={activeIndex}
          onItemClick={(index) => scrollToSection(index)}
        />
      </div>
    </aside>
  );
}
