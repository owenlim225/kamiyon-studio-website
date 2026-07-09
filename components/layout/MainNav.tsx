import Link from "next/link";
import type { NavItem } from "@/lib/config/navigation";

type MainNavProps = {
  items: readonly NavItem[];
  className?: string;
  onNavigate?: () => void;
};

export function MainNav({ items, className = "", onNavigate }: MainNavProps) {
  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="inline-flex min-h-11 items-center rounded-[var(--radius-button)] px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-sakura focus-visible:outline-offset-2 motion-reduce:transition-none"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
