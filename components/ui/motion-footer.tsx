"use client";

import Link from "next/link";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import type { NavItem, NavSocialLink } from "@/lib/config/navigation";
import {
  ensureGsapPlugins,
  gsap,
  GSAP_ALLOW_MOTION,
  GSAP_REDUCE_MOTION,
} from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion/reduced-motion";
import { STUDIO_LOCATION } from "@/lib/seo/constants";
import { cn } from "@/lib/utils";

const currentYear = new Date().getFullYear();

const MARQUEE_KEYWORDS = [
  "Games",
  "EdTech",
  "Portfolio",
  "Interactive Experiences",
  "Contact",
] as const;

export type CinematicFooterProps = {
  siteName: string;
  footerMotto: string;
  navItems: readonly NavItem[];
  socialLinks: readonly NavSocialLink[];
  contactCta: NavItem;
};

export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

function getSocialHref(link: NavSocialLink): string {
  if (link.platform === "email" && !link.href.startsWith("mailto:")) {
    return `mailto:${link.href.replace(/^mailto:/, "")}`;
  }

  return link.href;
}

function giantBrandLabel(siteName: string): string {
  const firstWord = siteName.trim().split(/\s+/)[0] ?? siteName;
  return firstWord.toUpperCase();
}

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useGsapContext(
      localRef,
      () => {
        const element = localRef.current;
        if (!element) {
          return;
        }

        const mm = gsap.matchMedia();

        mm.add(GSAP_ALLOW_MOTION, () => {
          const handleMouseMove = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const halfWidth = rect.width / 2;
            const halfHeight = rect.height / 2;
            const x = event.clientX - rect.left - halfWidth;
            const y = event.clientY - rect.top - halfHeight;

            gsap.to(element, {
              x: x * 0.4,
              y: y * 0.4,
              rotationX: -y * 0.15,
              rotationY: x * 0.15,
              scale: 1.05,
              ease: "power2.out",
              duration: 0.4,
            });
          };

          const handleMouseLeave = () => {
            gsap.to(element, {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              ease: "elastic.out(1, 0.3)",
              duration: 1.2,
            });
          };

          element.addEventListener("mousemove", handleMouseMove);
          element.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
          };
        });

        mm.add(GSAP_REDUCE_MOTION, () => {
          gsap.set(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
          });
        });
      },
      [],
    );

    return (
      <Component
        ref={(node: HTMLElement | null) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
MagneticButton.displayName = "MagneticButton";

type MarqueeItemProps = {
  motto: string;
};

function MarqueeItem({ motto }: MarqueeItemProps) {
  return (
    <div className="flex items-center space-x-12 px-6">
      <span>{motto}</span>
      <span className="text-primary/60" aria-hidden="true">
        ✦
      </span>
      {MARQUEE_KEYWORDS.map((keyword, index) => (
        <React.Fragment key={keyword}>
          <span>{keyword}</span>
          <span
            className={
              index % 2 === 0 ? "text-secondary/60" : "text-primary/60"
            }
            aria-hidden="true"
          >
            ✦
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

export function CinematicFooter({
  siteName,
  footerMotto,
  navItems,
  socialLinks,
  contactCta,
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInteractive(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.2 },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useGsapContext(
    wrapperRef,
    () => {
      ensureGsapPlugins();

      const mm = gsap.matchMedia();

      mm.add(GSAP_ALLOW_MOTION, () => {
        gsap.fromTo(
          giantTextRef.current,
          { y: "10vh", scale: 0.8, opacity: 0 },
          {
            y: "0vh",
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 80%",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );

        // Animate position only — keep interactive content opaque for focus visibility.
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 50 },
          {
            y: 0,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 40%",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
      });

      mm.add(GSAP_REDUCE_MOTION, () => {
        gsap.set([giantTextRef.current, headingRef.current, linksRef.current], {
          y: 0,
          scale: 1,
          opacity: 1,
        });
      });
    },
    [],
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative h-screen w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer
        className="cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground"
        inert={isInteractive ? undefined : true}
      >
        <div
          className="footer-aurora pointer-events-none absolute top-1/2 left-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px]"
          aria-hidden="true"
        />
        <div
          className="footer-bg-grid pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        />

        <div
          ref={giantTextRef}
          className="footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
          aria-hidden="true"
        >
          {giantBrandLabel(siteName)}
        </div>

        <div
          className="absolute top-12 left-0 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-border/50 bg-background/60 py-4 shadow-[var(--shadow-lg)] backdrop-blur-md"
          aria-hidden="true"
        >
          <div className="animate-footer-scroll-marquee flex w-max text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase md:text-sm">
            <MarqueeItem motto={footerMotto} />
            <MarqueeItem motto={footerMotto} />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
          <h2
            ref={headingRef}
            className="footer-text-glow mb-4 text-center font-display text-5xl font-black tracking-tighter md:text-8xl"
          >
            Ready to begin?
          </h2>
          <p className="mb-12 max-w-md text-center text-sm text-muted-foreground md:text-base">
            {footerMotto}
          </p>

          <div
            ref={linksRef}
            className="flex w-full flex-col items-center gap-6"
          >
            <div className="flex w-full flex-wrap justify-center gap-4">
              <MagneticButton
                as={Link}
                href={contactCta.href}
                className="footer-glass-pill group flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-foreground md:text-base"
              >
                {contactCta.label}
              </MagneticButton>

              <MagneticButton
                as={Link}
                href="/portfolio"
                className="footer-glass-pill group flex items-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-foreground md:text-base"
              >
                View portfolio
              </MagneticButton>
            </div>

            <nav aria-label="Footer" className="mt-2 w-full">
              <ul className="flex flex-wrap justify-center gap-3 md:gap-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <MagneticButton
                      as={Link}
                      href={item.href}
                      className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-muted-foreground hover:text-foreground md:text-sm"
                    >
                      {item.label}
                    </MagneticButton>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Connect">
              <ul className="flex flex-wrap justify-center gap-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    {link.comingSoon ? (
                      <span className="footer-glass-pill inline-flex cursor-default rounded-full px-6 py-3 text-xs font-medium text-muted-foreground md:text-sm">
                        {link.label}{" "}
                        <span className="ml-1 text-[10px]">(Coming soon)</span>
                      </span>
                    ) : (
                      <MagneticButton
                        as="a"
                        href={getSocialHref(link)}
                        className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-muted-foreground hover:text-foreground md:text-sm"
                        rel={
                          link.platform === "email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        target={
                          link.platform === "email" ? undefined : "_blank"
                        }
                      >
                        {link.label}
                      </MagneticButton>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
          <div className="order-2 space-y-1 text-center text-[10px] font-semibold tracking-widest text-muted-foreground uppercase md:order-1 md:text-left md:text-xs">
            <p>
              © {currentYear} {siteName}. All rights reserved.
            </p>
            <p>Based in {STUDIO_LOCATION}</p>
          </div>

          <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full border-border/50 px-6 py-3 md:order-2">
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase md:text-xs">
              Crafted with
            </span>
            <span
              className="animate-footer-heartbeat text-sm text-destructive md:text-base"
              aria-hidden="true"
            >
              ❤
            </span>
            <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase md:text-xs">
              by
            </span>
            <span className="ml-1 text-xs font-black tracking-normal text-foreground md:text-sm">
              {siteName}
            </span>
          </div>

          <MagneticButton
            as="button"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="footer-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <svg
              className="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-y-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </div>
  );
}
