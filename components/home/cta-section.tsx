import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-card border border-border bg-surface p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Vamos perceber se conseguimos ajudar a encontrar mais clientes para o seu negócio.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted sm:text-base">
              O primeiro passo é um diagnóstico comercial breve, sem compromisso.
            </p>
          </div>
          <Button href="/contacto" size="lg" className="w-full sm:w-auto">
            Pedir diagnóstico comercial
          </Button>
        </div>
      </Container>
    </section>
  );
}
