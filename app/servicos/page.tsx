import type { Metadata } from "next";
import {
  Globe,
  Search,
  Users,
  Compass,
  Cog,
  LineChart,
  TrendingUp,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";
import { servicesSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Serviços",
  description: "Marketing digital, prospeção comercial, geração de leads e automação de processos comerciais.",
  path: "/servicos",
});

const services = [
  {
    icon: Globe,
    title: "Marketing digital",
    description: "Melhoria dos pontos de contacto online que sustentam a prospeção comercial.",
    includes: [
      "Auditoria à presença digital atual",
      "Otimização de perfis e páginas de captação",
      "Alinhamento entre mensagem e público-alvo",
    ],
  },
  {
    icon: Search,
    title: "Prospeção comercial online",
    description: "Identificação de empresas e contactos alinhados com o seu perfil de cliente ideal.",
    includes: [
      "Pesquisa e identificação de potenciais clientes",
      "Construção de listas de prospeção",
      "Definição dos critérios de segmentação",
    ],
  },
  {
    icon: Users,
    title: "Geração de leads",
    description: "Contactos filtrados por critérios de qualificação definidos em conjunto consigo.",
    includes: [
      "Definição dos critérios de qualificação",
      "Captação de contactos qualificados",
      "Entrega estruturada à equipa comercial",
    ],
  },
  {
    icon: Compass,
    title: "Criação de estratégias de aquisição",
    description: "Definição do caminho até ao cliente, adaptado ao seu setor e ciclo de vendas.",
    includes: [
      "Definição dos canais prioritários",
      "Desenho do processo de aquisição",
      "Alinhamento com o ciclo de vendas existente",
    ],
  },
  {
    icon: Cog,
    title: "Automação de processos comerciais",
    description: "Redução do trabalho manual repetitivo nas fases iniciais do processo de vendas.",
    includes: [
      "Automação de tarefas repetitivas de prospeção",
      "Configuração de fluxos de contacto",
      "Redução de erros e esquecimentos manuais",
    ],
  },
  {
    icon: LineChart,
    title: "Otimização de processos de vendas",
    description: "Revisão do funil comercial para identificar onde as oportunidades se perdem.",
    includes: [
      "Revisão do funil comercial atual",
      "Identificação de pontos de perda de oportunidades",
      "Recomendações concretas de melhoria",
    ],
  },
  {
    icon: TrendingUp,
    title: "Apoio ao crescimento de empresas",
    description: "Acompanhamento contínuo da estratégia comercial à medida que o negócio cresce.",
    includes: [
      "Acompanhamento periódico da estratégia",
      "Ajustes com base nos indicadores gerados",
      "Suporte à escala do processo comercial",
    ],
  },
  {
    icon: Target,
    title: "Campanhas orientadas para resultados",
    description: "Ações de aquisição com objetivos definidos à partida, não apenas de visibilidade.",
    includes: [
      "Definição de objetivos mensuráveis",
      "Execução de campanhas de aquisição",
      "Acompanhamento dos indicadores gerados",
    ],
  },
];

export default function ServicosPage() {
  return (
    <>
      <JsonLd data={servicesSchema(services)} />

      <Container className="flex flex-col gap-6 py-20">
        <SectionHeading
          eyebrow="Serviços"
          title="Marketing digital e prospeção comercial, de ponta a ponta"
          description="Cada serviço pode ser contratado de forma isolada ou combinada, consoante o que já existe no seu processo comercial."
        />
      </Container>

      <Container className="flex flex-col gap-6 pb-20">
        {services.map((service) => (
          <div
            key={service.title}
            className="grid gap-4 rounded-card border border-border bg-surface p-6 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-8"
          >
            <Icon icon={service.icon} size={26} className="text-cyan" />
            <div>
              <h2 className="text-lg font-medium text-foreground">{service.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {service.description}
              </p>
              <ul className="mt-4 flex flex-col gap-1.5">
                {service.includes.map((item) => (
                  <li key={item} className="text-sm text-foreground-muted">
                    <span className="text-cyan">— </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="flex flex-col items-start gap-4 rounded-card border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-foreground">
            Não sabe qual serviço faz mais sentido para o seu caso?
          </p>
          <Button href="/contacto" size="lg" className="w-full sm:w-auto">
            Pedir diagnóstico comercial
          </Button>
        </div>
      </Container>
    </>
  );
}
