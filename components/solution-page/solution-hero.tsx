import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SolutionHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaHref: string;
  ctaLabel: string;
  visual: ReactNode;
};

/**
 * Hero das páginas de "Soluções" por segmento. Mesma estrutura das
 * páginas de aprofundamento já usadas no site (badge, h1, subtítulo,
 * CTA, visual ao lado) — mais compacta que a hero da homepage.
 */
export function SolutionHero({ eyebrow, title, subtitle, ctaHref, ctaLabel, visual }: SolutionHeroProps) {
  return (
    <section className="border-b border-border py-14 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <Badge variant="accent">{eyebrow}</Badge>

          <h1 className="max-w-xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            {subtitle}
          </p>

          <Button href={ctaHref} size="lg" className="mt-2">
            {ctaLabel}
          </Button>
        </div>

        {visual}
      </Container>
    </section>
  );
}
