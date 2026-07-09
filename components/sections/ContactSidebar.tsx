import { STUDIO_FOUNDED_YEAR, STUDIO_LOCATION } from "@/lib/seo/constants";

/** Canon studio facts only — omit any stat without a canon source (e.g. team size, awards). */
export function ContactSidebar() {
  return (
    <aside className="h-fit rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
        Studio facts
      </h2>
      <dl className="mt-4 space-y-4 text-sm text-[var(--text-primary)]">
        <div>
          <dt className="text-[var(--text-muted)]">Founded</dt>
          <dd className="mt-0.5 font-medium">{STUDIO_FOUNDED_YEAR}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-muted)]">Based in</dt>
          <dd className="mt-0.5 font-medium">{STUDIO_LOCATION}</dd>
        </div>
      </dl>
    </aside>
  );
}
