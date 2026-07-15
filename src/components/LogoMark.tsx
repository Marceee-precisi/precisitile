import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function LogoMark({ size = 40, className = "", priority = false }: Props) {
  return (
    <Image
      src="/logo.png"
      alt="Precisi Tile Solutions"
      width={size}
      height={size}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
