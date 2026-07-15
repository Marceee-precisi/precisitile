import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300";

  const styles = {
    primary:
      "bg-cyan text-ink hover:bg-cyan-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
    secondary:
      "border border-white/70 text-white hover:border-cyan hover:bg-cyan hover:text-ink",
    ghost:
      "border border-ink/20 text-ink hover:border-cyan hover:bg-cyan hover:text-ink",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
