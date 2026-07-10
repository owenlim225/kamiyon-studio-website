"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/lib/config/navigation";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";

type SiteHeaderProps = {
  navItems: readonly NavItem[];
  contactCta: NavItem;
  siteName: string;
};

export function SiteHeader({ navItems, contactCta, siteName }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-primary)]/95 shadow-[var(--shadow-sm)] backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo siteName={siteName} />

        <div className="hidden items-center gap-6 lg:flex">
          <MainNav items={navItems} orientation="horizontal" />
          <Button href={contactCta.href} variant="primary">
            {contactCta.label}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button href={contactCta.href} variant="primary" className="hidden sm:inline-flex">
            {contactCta.label}
          </Button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-button)] border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] focus-visible:outline-offset-2"
            aria-expanded={isOpen}
            aria-controls={menuId}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="text-lg leading-none">
              {isOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          id={menuId}
          className="border-t border-[var(--border-default)] bg-[var(--bg-primary)] lg:hidden"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <MainNav items={navItems} onNavigate={closeMenu} />
            <div className="mt-4 sm:hidden">
              <Button href={contactCta.href} variant="primary" className="w-full">
                {contactCta.label}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
