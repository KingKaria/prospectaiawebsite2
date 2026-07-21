import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { HeroVisual } from "@/components/home/hero-visual";
import { siteConfig } from "@/lib/constants";

const trustPoints = [
  "Sem prospeção manual",
  "Estratégia à medida do seu negócio",
  "Diagnóstico inicial sem compromisso",
];

export function HeroSection() {
  return (
    <section className="border-b border-border py-14 lg:py-32">
      <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-20">
        <div className="flex flex-col items-start gap-5 sm:gap-6">
          <Badge variant="accent">Marketing digital e prospeção comercial</Badge>

          <h1 className="max-w-xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Encontramos os clientes. A sua equipa fecha o negócio.
          </h1>

          <p className="-mt-2 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            Marketing digital e prospeção comercial orientados por dados:
            identificamos oportunidades comerciais reais e desenhamos a
            estratégia de aquisição certa para PME, empresas B2B e startups.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contacto" size="lg">
              Pedir diagnóstico comercial
            </Button>
            <Button href="/servicos" variant="secondary" size="lg">
              Ver serviços
            </Button>
          </div>

          <ul className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-foreground-muted">
                <Icon icon={CheckCircle2} size={16} className="shrink-0 text-cyan" />
                {point}
              </li>
            ))}
          </ul>

          <p className="pt-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
            {siteConfig.tagline}
          </p>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
