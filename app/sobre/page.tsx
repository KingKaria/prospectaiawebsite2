import type { Metadata } from "next";
import { Database, Eye, Handshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sobre",
  description: "Conheça a abordagem da ProspectAIA à prospeção comercial e ao marketing orientado a dados.",
  path: "/sobre",
});

const principles = [
  {
    icon: Database,
    title: "Decisões com base em dados",
    description:
      "Os segmentos, canais e mensagens de prospeção são escolhidos com base em critérios verificáveis, não em suposições sobre o que deveria funcionar.",
  },
  {
    icon: Eye,
    title: "Transparência sobre o que funciona",
    description:
      "Não escondemos o que não está a gerar resultado. Preferimos ajustar cedo a manter uma estratégia só porque já foi decidida.",
  },
  {
    icon: Handshake,
    title: "Foco no processo comercial, não em vaidade de marketing",
    description:
      "O objetivo é gerar oportunidades reais para a equipa comercial, não acumular métricas que não se traduzem em vendas.",
  },
];

export default function SobrePage() {
  return (
    <>
      <Container className="flex flex-col gap-6 py-20">
        <SectionHeading
          eyebrow="Sobre nós"
          title="Ajudamos empresas a encontrar clientes de forma estruturada"
          description="A ProspectAIA nasceu para resolver um problema concreto: equipas comerciais que perdem tempo com prospeção manual e pouco previsível. Juntamos dados, tecnologia e estratégia comercial para tornar esse processo mais eficiente e mensurável."
        />
      </Container>

      <Container className="flex flex-col gap-10 pb-20">
        <SectionHeading eyebrow="Como pensamos" title="Princípios que guiam o nosso trabalho" />

        <div className="grid gap-5 sm:grid-cols-3">
          {principles.map((principle) => (
            <Card key={principle.title}>
              <Icon icon={principle.icon} size={24} className="text-cyan" />
              <h3 className="mt-4 text-base font-medium text-foreground">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {principle.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4 rounded-card border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-foreground">
            Quer perceber se conseguimos ajudar o seu negócio a encontrar mais clientes?
          </p>
          <Button href="/contacto" size="lg" className="w-full sm:w-auto">
            Falar connosco
          </Button>
        </div>
      </Container>
    </>
  );
}
