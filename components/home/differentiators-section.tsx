import { Database, Eye, Puzzle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

const differentiators = [
  {
    icon: Database,
    title: "Decisões orientadas a dados",
    description: "Os segmentos e canais de prospeção são escolhidos com base em critérios verificáveis, não em suposições.",
  },
  {
    icon: Eye,
    title: "Métricas visíveis desde o início",
    description: "Acompanha o que está a ser feito e os indicadores gerados, sem depender de relatórios avulsos.",
  },
  {
    icon: Puzzle,
    title: "Marketing e prospeção integrados",
    description: "Uma única estratégia liga a presença digital à geração de oportunidades comerciais.",
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="border-b border-border py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Diferenciação" title="O que distingue a nossa forma de trabalhar" />

        <div className="grid gap-5 sm:grid-cols-3">
          {differentiators.map((item) => (
            <Card key={item.title}>
              <Icon icon={item.icon} size={24} className="text-violet-accent" />
              <h3 className="mt-4 text-base font-medium text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
