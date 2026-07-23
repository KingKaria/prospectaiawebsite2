import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type SolutionUseCase = {
  title: string;
  scenario: string;
};

type SolutionUseCasesProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  useCases: SolutionUseCase[];
};

const DISCLAIMER = "Cenário ilustrativo — não representa um caso de cliente específico.";

/**
 * Casos de utilização apresentados como cenários ilustrativos, não como
 * testemunhos ou empresas reais — não existem, nesta fase, casos de
 * cliente aprovados para publicação. O aviso aparece em cada cartão,
 * nunca só uma vez no topo da secção, para nunca poder ser lido em
 * separado do cenário a que se refere.
 */
export function SolutionUseCases({ eyebrow, title, description, useCases }: SolutionUseCasesProps) {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="grid gap-5 sm:grid-cols-2">
          {useCases.map((useCase) => (
            <Card key={useCase.title} className="flex flex-col gap-3">
              <Badge variant="outline" className="self-start">
                {DISCLAIMER}
              </Badge>
              <h3 className="text-base font-medium text-foreground">{useCase.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{useCase.scenario}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
