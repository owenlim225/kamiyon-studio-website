import Link from "next/link";
import type { NavItem } from "@/lib/config/navigation";

type MainNavProps = {
  items: readonly NavItem[];
  className?: string;
  onNavigate?: () => void;
  /**
   * "vertical" (default) for the mobile drawer, "horizontal" for the desktop
   * rail. Deliberately not a `md:`/`lg:` breakpoint switch on the list
   * itself — this component is reused inside the mobile drawer, which stays
   * mounted (and must stay a vertical list) across the full 768–1023px
   * tablet range, below the header's own `lg:flex` desktop-rail cutover.
   */
  orientation?: "vertical" | "horizontal";
};

export function MainNav({
  items,
  className = "",
  onNavigate,
  orientation = "vertical",
}: MainNavProps) {
  const listClasses =
    orientation === "horizontal"
      ? "flex items-center gap-1"
      : "flex flex-col gap-1";

  return (
    <nav aria-label="Primary" className={className}>
      <ul className={listClasses}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="inline-flex min-h-11 items-center rounded-[var(--radius-button)] px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-sakura-ink focus-visible:outline-offset-2 motion-reduce:transition-none"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
