import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Service } from "@/lib/cms/types";

const ICON_GLYPHS: Record<string, string> = {
  gamepad: "🎮",
  rocket: "🚀",
  sparkles: "✨",
  globe: "🌐",
  smartphone: "📱",
  palette: "🎨",
  brain: "🧠",
  blocks: "⛓️",
  "messages-square": "💬",
  brush: "🖌️",
};

function getIconGlyph(icon: string | undefined): string {
  if (!icon) {
    return "✦";
  }

  return ICON_GLYPHS[icon] ?? "✦";
}

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug.current}`}
      className="group flex flex-col rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)] focus-visible:outline-offset-2"
    >
      <div className="flex items-center justify-between">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-accent)] text-xl"
          aria-hidden="true"
        >
          {getIconGlyph(service.icon)}
        </span>
        {service.isPlaceholder ? <Badge variant="placeholder">Placeholder</Badge> : null}
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)]">
        {service.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{service.summary}</p>
      <span className="mt-4 text-sm font-medium text-sakura-ink transition-colors group-hover:opacity-80">
        Learn more →
      </span>
    </Link>
  );
}
