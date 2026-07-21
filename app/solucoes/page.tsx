import type { Metadata } from "next";
import { Building2, Briefcase, Rocket, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Soluções",
  description: "Soluções de marketing e prospeção adaptadas a PME, agências, startups e equipas comerciais.",
  path: "/solucoes",
});

const segments = [
  {
    icon: Building2,
    title: "PME",
    challenge: "Equipas comerciais pequenas, sem tempo disponível para prospeção sistemática.",
    approach: "Implementamos um processo de prospeção que não depende de contratar mais pessoas para funcionar.",
  },
  {
    icon: Briefcase,
    title: "Empresas B2B",
    challenge: "Ciclos de venda mais longos e decisores difíceis de identificar e alcançar.",
    approach: "Estruturamos a prospeção em torno do ciclo de decisão real da empresa-alvo, não de um contacto único.",
  },
  {
    icon: Rocket,
    title: "Startups",
    challenge: "Poucos canais de aquisição validados e orçamento limitado para testar todos.",
    approach: "Ajudamos a validar e priorizar os canais com maior probabilidade de gerar clientes iniciais.",
  },
  {
    icon: UserCheck,
    title: "Agências e profissionais independentes",
    challenge: "Dependência de recomendações para conseguir novos clientes de forma consistente.",
    approach: "Criamos um canal de aquisição próprio, complementar às recomendações que já recebe.",
  },
];

export default function SolucoesPage() {
  return (
    <>
      <Container className="flex flex-col gap-6 py-20">
        <SectionHeading
          eyebrow="Soluções"
          title="Soluções adaptadas ao seu tipo de negócio"
          description="O processo de prospeção muda consoante o tipo de negócio. Por isso partimos sempre do desafio comercial concreto, não de um pacote fechado."
        />
      </Container>

      <Container className="flex flex-col gap-6 pb-20">
        {segments.map((segment) => (
          <div
            key={segment.title}
            className="grid gap-4 rounded-card border border-border bg-surface p-6 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-8"
          >
            <Icon icon={segment.icon} size={26} className="text-violet-accent" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h2 className="text-lg font-medium text-foreground">{segment.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  <span className="text-foreground">Desafio comum: </span>
                  {segment.challenge}
                </p>
              </div>
              <div className="sm:pt-8">
                <p className="text-sm leading-relaxed text-foreground-muted">
                  <span className="text-foreground">Como ajudamos: </span>
                  {segment.approach}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col items-start gap-4 rounded-card border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-foreground">
            Não encontrou o seu caso? Fale connosco na mesma.
          </p>
          <Button href="/contacto" size="lg" className="w-full sm:w-auto">
            Falar connosco
          </Button>
        </div>
      </Container>
    </>
  );
}
