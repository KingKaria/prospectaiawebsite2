import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

type SolutionCtaProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  /** Linha de confiança/redução de risco — nunca uma garantia de resultado. */
  reassurance?: string;
};

/** CTA final — convite a uma conversa, nunca uma promessa de resultado. */
export function SolutionCta({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  reassurance,
}: SolutionCtaProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start gap-6 rounded-card border border-border bg-surface p-8 sm:items-center sm:text-center">
          <div className="max-w-2xl">
            <h2 className="text-xl font-medium text-foreground sm:text-2xl">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted sm:text-base">
              {description}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={primaryHref} size="lg" className="w-full sm:w-auto">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="secondary" size="lg" className="w-full sm:w-auto">
              {secondaryLabel}
            </Button>
          </div>
          {reassurance ? (
            <p className="text-xs text-foreground-subtle">{reassurance}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
