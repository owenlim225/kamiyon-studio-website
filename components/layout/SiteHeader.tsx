"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CONTACT_CTA, PRIMARY_NAV_ITEMS } from "@/lib/config/navigation";
import { Logo } from "./Logo";
import { MainNav } from "./MainNav";

export function SiteHeader() {
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
        <Logo />

        <div className="hidden items-center gap-6 lg:flex">
          <MainNav items={PRIMARY_NAV_ITEMS} />
          <Button href={CONTACT_CTA.href} variant="primary">
            {CONTACT_CTA.label}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button href={CONTACT_CTA.href} variant="primary" className="hidden sm:inline-flex">
            {CONTACT_CTA.label}
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
            <MainNav items={PRIMARY_NAV_ITEMS} onNavigate={closeMenu} />
            <div className="mt-4 sm:hidden">
              <Button href={CONTACT_CTA.href} variant="primary" className="w-full">
                {CONTACT_CTA.label}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
