import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    number: "01",
    title: "Diagnóstico comercial",
    description: "Análise do processo de vendas atual e do perfil de cliente que procura alcançar.",
  },
  {
    number: "02",
    title: "Definição da estratégia",
    description: "Desenho do processo de prospeção e dos critérios de qualificação de leads.",
  },
  {
    number: "03",
    title: "Implementação e automação",
    description: "Configuração das ferramentas e processos de aquisição e prospeção.",
  },
  {
    number: "04",
    title: "Acompanhamento e otimização",
    description: "Revisão contínua dos resultados e ajuste da estratégia com base no que funciona.",
  },
];

export function ProcessSection() {
  return (
    <section className="border-b border-border py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Como funciona" title="Um processo estruturado, de ponta a ponta" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-3 border-t border-border-strong pt-5">
              <span className="font-mono text-sm text-cyan">{step.number}</span>
              <h3 className="text-base font-medium text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-foreground-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
