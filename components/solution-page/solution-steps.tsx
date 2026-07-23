import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export type SolutionStep = {
  title: string;
  description: string;
};

type SolutionStepsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: SolutionStep[];
};

/** Timeline vertical: linha de ligação com gradiente da marca por trás dos
 * marcadores numerados, para reforçar visualmente a ideia de processo
 * contínuo em vez de uma lista solta de passos. */
export function SolutionSteps({ eyebrow, title, description, steps }: SolutionStepsProps) {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <ol className="relative flex flex-col gap-8 pl-10 sm:pl-12">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[15px] w-px bg-[linear-gradient(180deg,var(--color-cyan),var(--color-violet))] opacity-40 sm:left-[19px]"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs text-cyan sm:-left-12 sm:h-10 sm:w-10"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-medium text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
