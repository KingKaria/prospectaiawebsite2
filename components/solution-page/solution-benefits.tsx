import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export type SolutionBenefit = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Valor qualitativo para a empresa — nunca uma percentagem ou garantia. */
  businessValue: string;
};

type SolutionBenefitsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  benefits: SolutionBenefit[];
};

/**
 * Grelha de benefícios individuais — sempre qualitativos. Nunca
 * percentagens, tempos poupados nem volumes inventados; o texto que os
 * introduz deve deixar claro que são efeitos possíveis, não garantias.
 */
export function SolutionBenefits({ eyebrow, title, description, benefits }: SolutionBenefitsProps) {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="flex flex-col gap-3">
              <Icon icon={benefit.icon} size={22} className="text-cyan" />
              <h3 className="text-base font-medium text-foreground">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{benefit.description}</p>
              <p className="mt-1 border-t border-border pt-3 text-sm leading-relaxed text-foreground-muted">
                <span className="font-medium text-foreground">Valor para a empresa: </span>
                {benefit.businessValue}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
