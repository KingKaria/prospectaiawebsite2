import { Fragment } from "react";
import { Radar, Route, TrendingUp, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

const steps = [
  {
    number: "01",
    icon: Radar,
    title: "Dados",
    description:
      "Cruzamos critérios firmográficos, comportamentais e sinais de mercado para identificar e qualificar, com contexto real, que contactos têm hoje motivo para comprar — não apenas quem calha estar numa lista.",
  },
  {
    number: "02",
    icon: Route,
    title: "Estratégia",
    description:
      "Esses dados são interpretados e transformados em prioridades: que segmentos abordar primeiro, com que mensagem e por que canal — um plano de aquisição definido antes do primeiro contacto.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Resultados",
    description:
      "A sua equipa fala apenas com quem já foi qualificado — menos tempo perdido, decisões mais rápidas sobre onde investir esforço, e crescimento que não depende de aumentar a equipa.",
  },
];

/**
 * Sequência narrativa (não três cartões independentes): cada descrição
 * refere-se explicitamente ao passo anterior ("Esses dados...", "A sua
 * equipa fala apenas com quem já foi qualificado") para transmitir um
 * processo contínuo. Layout deliberadamente distinto da Hero — cabeçalho
 * centrado, sem cartões com fundo/borda, ligado por numeração e um
 * conector de seta em vez de colunas texto+visual.
 */
export function ValuePropositionSection() {
  return (
    <section className="border-b border-border py-24">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          align="center"
          eyebrow="O método"
          title="Cada oportunidade percorre o mesmo caminho: dados, estratégia, resultado."
          description="Não são três serviços separados — é uma sequência. O que aprendemos numa fase determina o que fazemos na seguinte."
        />

        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-4">
          {steps.map((step, index) => (
            <Fragment key={step.number}>
              <div className="flex flex-col gap-4 sm:flex-1">
                <div className="h-0.5 w-8 bg-[linear-gradient(90deg,var(--color-cyan),var(--color-violet)_115%)]" />

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-foreground-subtle">{step.number}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan/10 transition-colors duration-200 hover:bg-cyan/15">
                    <Icon icon={step.icon} size={18} className="text-cyan" />
                  </span>
                </div>

                <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-muted">{step.description}</p>
              </div>

              {index < steps.length - 1 ? (
                <div className="hidden shrink-0 items-center justify-center sm:flex sm:pt-12">
                  <Icon icon={ChevronRight} size={18} className="text-foreground-subtle" />
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
