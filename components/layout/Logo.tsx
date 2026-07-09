import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

/** Logo mark: docs/assets/svg.svg (confirmed sakura-blossom vector, source of the --color-sakura hex). */
export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight text-[var(--text-primary)] hover:text-sakura-ink focus-visible:outline-offset-4 ${className}`.trim()}
      aria-label="Kamiyon Studio — Home"
    >
      <Image
        src="/logo.svg"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 shrink-0"
        priority
      />
      <span>Kamiyon Studio</span>
    </Link>
  );
}
