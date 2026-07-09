import Link from "next/link";

type EmptyStateProps = {
  message: string;
  backHref: string;
  backLabel: string;
};

export function EmptyState({ message, backHref, backLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-card-lg)] border border-dashed border-[var(--border-default)] bg-[var(--bg-secondary)] px-6 py-16 text-center">
      <span className="text-5xl" aria-hidden="true">
        🌸
      </span>
      <p className="mt-4 text-base text-[var(--text-secondary)]">{message}</p>
      <Link
        href={backHref}
        className="mt-4 text-sm font-medium text-sakura transition-colors hover:opacity-80 focus-visible:outline-offset-2"
      >
        {backLabel}
      </Link>
    </div>
  );
}
