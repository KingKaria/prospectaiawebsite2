import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export type SolutionMistake = {
  title: string;
  consequence: string;
};

type SolutionMistakesProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  mistakes: SolutionMistake[];
};

export function SolutionMistakes({ eyebrow, title, description, mistakes }: SolutionMistakesProps) {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="grid gap-4 sm:grid-cols-2">
          {mistakes.map((mistake) => (
            <Card key={mistake.title} className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <Icon icon={AlertTriangle} size={18} className="mt-0.5 shrink-0 text-danger" />
                <h3 className="text-sm font-medium text-foreground">{mistake.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-foreground-muted">{mistake.consequence}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
