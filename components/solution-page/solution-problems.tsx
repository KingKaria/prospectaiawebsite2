import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export type SolutionProblem = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Impacto qualitativo no negócio — nunca um número ou valor monetário. */
  businessImpact: string;
};

type SolutionProblemsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  problems: SolutionProblem[];
};

export function SolutionProblems({ eyebrow, title, description, problems }: SolutionProblemsProps) {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="grid gap-5 sm:grid-cols-2">
          {problems.map((problem) => (
            <Card key={problem.title} className="flex flex-col gap-3">
              <Icon icon={problem.icon} size={24} className="text-violet-accent" />
              <h3 className="text-base font-medium text-foreground">{problem.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{problem.description}</p>
              <p className="mt-1 border-t border-border pt-3 text-sm leading-relaxed text-foreground-muted">
                <span className="font-medium text-foreground">Impacto no negócio: </span>
                {problem.businessImpact}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
