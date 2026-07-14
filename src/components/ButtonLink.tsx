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
    "inline-flex items-center justify-center px-6 py-3.5 text-[0.75rem] font-medium tracking-[0.16em] uppercase transition-all duration-300";

  const styles = {
    primary:
      "bg-lake text-white hover:bg-lake-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake",
    secondary:
      "border border-white/70 text-white hover:bg-white hover:text-ink",
    ghost:
      "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
