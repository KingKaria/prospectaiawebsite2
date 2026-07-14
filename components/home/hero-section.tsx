import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Hero provisório — apenas para validar tipografia, cores, botões e
 * responsividade nesta etapa. Será substituído por conteúdo definitivo
 * numa etapa posterior da homepage.
 */
export function HeroSection() {
  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container className="flex flex-col items-start gap-6">
        <Badge variant="accent">Marketing digital e prospeção comercial</Badge>

        <h1 className="max-w-2xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          Encontramos os clientes certos para a sua equipa comercial vender mais.
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
          Combinamos dados, tecnologia e estratégia comercial para identificar
          potenciais clientes, gerar oportunidades qualificadas e apoiar o
          crescimento de empresas B2B, PME e equipas comerciais.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contacto" size="lg">
            Pedir diagnóstico comercial
          </Button>
          <Button href="/servicos" variant="secondary" size="lg">
            Ver serviços
          </Button>
        </div>
      </Container>
    </section>
  );
}
