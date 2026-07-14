import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeStyles = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
} as const;

/**
 * Wordmark provisório.
 *
 * TODO(branding): assim que o ficheiro oficial da logótipo for adicionado em
 * `public/brand/` (ver public/brand/README.md), substituir este texto por
 * `next/image` a apontar para esse ficheiro. Manter esta assinatura de props
 * (className, size) para não obrigar a alterar Header/Footer.
 */
export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <span
      className={cn(
        "font-semibold tracking-tight whitespace-nowrap",
        sizeStyles[size],
        className
      )}
    >
      <span className="text-foreground">Prospect</span>
      <span className="bg-[linear-gradient(90deg,var(--color-cyan),var(--color-violet))] bg-clip-text text-transparent">
        AIA
      </span>
    </span>
  );
}
