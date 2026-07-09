import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-sakura focus-visible:outline-offset-4 ${className}`.trim()}
      aria-label="Kamiyon Studio — Home"
    >
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-accent)] text-sakura"
      >
        ✿
      </span>
      <span>Kamiyon Studio</span>
    </Link>
  );
}
