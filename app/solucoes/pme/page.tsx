import type { Metadata } from "next";
import Image from "next/image";
import {
  Clock,
  RefreshCw,
  Users,
  ListFilter,
  ClipboardList,
  Search,
  Compass,
  BarChart3,
  Layers,
  UserCheck,
  ListChecks,
  Repeat,
  Workflow,
  Repeat2,
  TrendingUp,
  RotateCw,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/structured-data";
import { SolutionHero } from "@/components/solution-page/solution-hero";
import { SolutionProblems, type SolutionProblem } from "@/components/solution-page/solution-problems";
import { SolutionMistakes, type SolutionMistake } from "@/components/solution-page/solution-mistakes";
import { SolutionSteps, type SolutionStep } from "@/components/solution-page/solution-steps";
import { SolutionBenefits, type SolutionBenefit } from "@/components/solution-page/solution-benefits";
import {
  SolutionCapabilities,
  type SolutionCapability,
} from "@/components/solution-page/solution-capabilities";
import {
  SolutionComparison,
  type SolutionComparisonRow,
} from "@/components/solution-page/solution-comparison";
import { SolutionUseCases, type SolutionUseCase } from "@/components/solution-page/solution-use-cases";
import { SolutionCta } from "@/components/solution-page/solution-cta";

// Caminhos simples (não import estático): o pipeline de imagens do
// Next.js resolve isto sem configuração extra em produção, e evita
// depender de um transformador de assets que o Vitest não tem para
// imports estáticos de imagem — mais portátil entre os dois ambientes.
const heroImage = "/images/solucoes/pme/pme-equipa-prospecao-comercial.webp";
const problemImage = "/images/solucoes/pme/pme-empresario-sobrecarga-comercial.webp";
const processImage = "/images/solucoes/pme/pme-apresentacao-estrategia-comercial.webp";
const benefitsImage = "/images/solucoes/pme/pme-profissional-confianca-negocios.webp";
const useCasesImage = "/images/solucoes/pme/pme-pequeno-negocio-clientes.webp";
const ctaImage = "/images/solucoes/pme/pme-equipa-colaboracao-comercial.webp";

const TITLE = "Soluções para PME";
const DESCRIPTION =
  "Como estruturar a prospeção comercial numa PME sem aumentar a equipa — um processo pensado para o tempo real que já tem disponível.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/solucoes/pme",
});

const problems: SolutionProblem[] = [
  {
    icon: Clock,
    title: "Falta de tempo dedicado à prospeção",
    description:
      "A equipa comercial acumula vendas com apoio ao cliente, operações e administrativo. Prospetar fica sempre para depois.",
    businessImpact: "Oportunidades comerciais que deixam de ser acompanhadas.",
  },
  {
    icon: RefreshCw,
    title: "Prospeção inconsistente",
    description:
      "Sem um processo definido, a prospeção acontece em explosões seguidas de longos períodos de paragem.",
    businessImpact: "Menor consistência na prospeção, com semanas inteiras sem qualquer contacto novo.",
  },
  {
    icon: Users,
    title: "Dependência de recomendações",
    description: "O crescimento comercial depende quase inteiramente de quem já conhece a empresa.",
    businessImpact:
      "Dependência excessiva de contactos ocasionais, sem controlo sobre quando surgem novas oportunidades.",
  },
  {
    icon: ListFilter,
    title: "Falta de critério de priorização",
    description:
      "Sem critério definido, todas as empresas parecem igualmente relevantes — ou nenhuma parece suficientemente relevante.",
    businessImpact: "Dificuldade em priorizar empresas, com esforço comercial disperso.",
  },
  {
    icon: ClipboardList,
    title: "Tarefas manuais repetitivas",
    description:
      "Procurar contactos, organizar listas e agendar follow-ups consome tempo que podia ser gasto a vender.",
    businessImpact: "Tempo perdido em tarefas manuais que poderiam ser estruturadas uma única vez.",
  },
];

const causes: SolutionMistake[] = [
  {
    title: "Tratar prospeção como tarefa de “quando sobrar tempo”",
    consequence:
      "Sem tempo protegido, a prospeção é sempre a primeira coisa a ser adiada — e acaba por nunca acontecer de forma consistente.",
  },
  {
    title: "Contratar mais uma pessoa antes de definir o processo",
    consequence:
      "Sem um processo claro, uma pessoa extra só distribui o mesmo caos por mais gente, sem resolver a causa.",
  },
  {
    title: "Depender só de recomendações",
    consequence:
      "Recomendações são valiosas, mas imprevisíveis — não dão controlo sobre quando e quantas oportunidades vão aparecer.",
  },
  {
    title: "Tentar contactar todas as empresas possíveis",
    consequence:
      "Sem critério, o esforço comercial dispersa-se por empresas com pouca probabilidade real de fechar negócio.",
  },
];

const steps: SolutionStep[] = [
  {
    title: "Diagnóstico comercial",
    description:
      "Percebemos o que já funciona, o que consome tempo sem retorno, e onde está o maior desperdício de esforço comercial.",
  },
  {
    title: "Definição de critério",
    description:
      "Definimos, em conjunto, que tipo de empresa faz mais sentido contactar primeiro — sem depender de listas genéricas.",
  },
  {
    title: "Estrutura de prospeção",
    description:
      "Desenhamos um processo simples de seguir, adaptado ao tempo real que a equipa tem disponível.",
  },
  {
    title: "Acompanhamento",
    description:
      "Ajustamos o processo à medida que percebemos o que está, de facto, a gerar oportunidades.",
  },
];

const benefits: SolutionBenefit[] = [
  {
    icon: Search,
    title: "Foco no tempo comercial disponível",
    description: "O tempo que a equipa já tem é dirigido às empresas com maior probabilidade real de responder.",
    businessValue: "Menos esforço disperso, mais tempo em conversas com potencial real.",
  },
  {
    icon: Compass,
    title: "Critério de qualificação partilhado",
    description: "Toda a equipa passa a decidir com o mesmo critério, não por intuição individual.",
    businessValue: "Decisões mais consistentes, independentemente de quem está a prospetar.",
  },
  {
    icon: RotateCw,
    title: "Processo que sobrevive a semanas cheias",
    description: "A prospeção deixa de depender de haver “tempo livre” na agenda.",
    businessValue: "Continuidade comercial mesmo em períodos de maior carga operacional.",
  },
  {
    icon: Users,
    title: "Menos dependência de recomendações",
    description: "Um canal de aquisição que a empresa controla, complementar às recomendações que já recebe.",
    businessValue: "Menor exposição a variações imprevisíveis no volume de indicações.",
  },
  {
    icon: BarChart3,
    title: "Visibilidade sobre o que está a ser feito",
    description: "Fica claro que empresas foram contactadas, com que critério e em que fase.",
    businessValue: "Decisões de gestão comercial baseadas em informação, não em memória.",
  },
  {
    icon: Layers,
    title: "Processo que não exige mais pessoas",
    description: "O ganho vem da estrutura do processo, não do aumento da equipa comercial.",
    businessValue: "Crescimento comercial sem pressão imediata para contratar.",
  },
  {
    icon: ListFilter,
    title: "Prioridades claras desde o início",
    description: "Cada oportunidade chega já com uma leitura sobre a sua relevância.",
    businessValue: "Menos tempo gasto a decidir por onde começar.",
  },
  {
    icon: ClipboardList,
    title: "Redução de tarefas manuais repetitivas",
    description: "Passos que se repetiam manualmente ficam estruturados uma única vez.",
    businessValue: "Mais tempo disponível para conversas comerciais reais.",
  },
  {
    icon: Clock,
    title: "Adaptação ao ciclo de venda real",
    description: "O processo acompanha o tempo que cada negociação efetivamente demora.",
    businessValue: "Menos pressão para forçar decisões comerciais antes de tempo.",
  },
  {
    icon: UserCheck,
    title: "Continuidade mesmo com rotação de equipa",
    description: "O processo fica documentado, não depende só da memória de uma pessoa.",
    businessValue: "Menor perda de conhecimento comercial quando alguém sai da equipa.",
  },
  {
    icon: TrendingUp,
    title: "Base para decisões de crescimento",
    description: "Com um processo definido, fica mais claro onde investir a seguir.",
    businessValue: "Decisões de investimento comercial mais informadas.",
  },
  {
    icon: Repeat,
    title: "Acompanhamento contínuo do processo",
    description: "O processo é revisto à medida que a empresa e o mercado mudam.",
    businessValue: "Um processo que se mantém relevante, não um documento esquecido numa gaveta.",
  },
];

const capabilities: SolutionCapability[] = [
  {
    icon: ListChecks,
    title: "Diagnóstico comercial inicial",
    description: "Uma leitura ao processo comercial atual, antes de qualquer alteração.",
    advantage: "Ponto de partida claro, sem suposições.",
  },
  {
    icon: ListFilter,
    title: "Definição de critérios de qualificação",
    description: "Que tipo de empresa faz sentido contactar primeiro, definido em conjunto consigo.",
    advantage: "Menos tempo perdido em contactos pouco alinhados.",
  },
  {
    icon: Workflow,
    title: "Estrutura de prospeção comercial",
    description: "Um processo simples, adaptado ao tempo real que a equipa tem disponível.",
    advantage: "Prospeção que acontece mesmo com equipa reduzida.",
  },
  {
    icon: Repeat2,
    title: "Acompanhamento contínuo",
    description: "Ajustes ao processo à medida que se percebe o que está, de facto, a funcionar.",
    advantage: "Um processo que evolui com o negócio, não um plano fixo.",
  },
];

const comparisonRows: SolutionComparisonRow[] = [
  {
    aspect: "Critério de contacto",
    unstructured: "Baseado em recomendações e acaso",
    structured: "Baseado em sinais reais de oportunidade",
  },
  {
    aspect: "Consistência",
    unstructured: "Depende de quem tem tempo naquela semana",
    structured: "Processo que continua a acontecer mesmo em semanas cheias",
  },
  {
    aspect: "Visibilidade",
    unstructured: "Difícil saber o que está, de facto, a funcionar",
    structured: "Critério e processo claros, partilhados por toda a equipa",
  },
  {
    aspect: "Escala",
    unstructured: "Cresce só contratando mais pessoas",
    structured: "Cresce ajustando o processo, não só o número de pessoas",
  },
  {
    aspect: "Foco do tempo comercial",
    unstructured: "Disperso por muitas empresas pouco qualificadas",
    structured: "Concentrado nas empresas com maior probabilidade real",
  },
];

const useCases: SolutionUseCase[] = [
  {
    title: "Quando a prospeção depende de uma só pessoa",
    scenario:
      "Uma equipa onde só uma pessoa acumula vendas com todas as outras funções, e a prospeção é sempre a primeira tarefa a ser adiada quando surge outro trabalho.",
  },
  {
    title: "Quando o crescimento depende de recomendações",
    scenario:
      "Um negócio com boa reputação, mas cujo crescimento comercial não é controlável — depende de quem recomenda, e de quando o faz.",
  },
  {
    title: "Quando existe uma lista de contactos mas sem critério",
    scenario:
      "Uma lista de empresas reunida ao longo do tempo, sem nenhum critério que permita decidir com clareza por onde começar.",
  },
  {
    title: "Quando a equipa cresce mas o processo não acompanha",
    scenario:
      "Uma nova pessoa entra para a área comercial mas, sem um processo definido, herda o mesmo caos de antes — só distribuído por mais gente.",
  },
];

const faqItems: AccordionItemData[] = [
  {
    question: "Não temos ninguém dedicado a vendas — isto funciona na mesma?",
    answer:
      "Sim. O processo é desenhado precisamente para equipas pequenas, onde a prospeção é só uma parte do que cada pessoa faz.",
  },
  {
    question: "Quanto tempo por semana é preciso dedicar a isto?",
    answer: "Depende da disponibilidade real da equipa — o processo é adaptado a esse tempo, não o contrário.",
  },
  {
    question: "Isto substitui a nossa equipa comercial?",
    answer:
      "Não. Trabalhamos com a equipa que já existe, para tornar o tempo dela mais produtivo, não para a substituir.",
  },
  {
    question: "E se ainda não tivermos um perfil de cliente definido?",
    answer: "Fazemos parte desse trabalho no diagnóstico inicial — não precisa de chegar já definido.",
  },
  {
    question: "Isto funciona para qualquer setor de PME?",
    answer: "O princípio aplica-se a qualquer setor B2B; os critérios concretos variam consoante o negócio.",
  },
  {
    question: "Como começamos?",
    answer: "Com um diagnóstico comercial inicial, sem compromisso, para perceber se faz sentido avançar.",
  },
  {
    question: "Qual é a diferença entre isto e contratar uma agência de leads?",
    answer:
      "Não vendemos listas de contactos genéricas — construímos um processo de qualificação e prospeção adaptado à sua empresa, não um ficheiro de contactos.",
  },
  {
    question: "Precisamos de software ou ferramentas específicas?",
    answer:
      "Não é uma exigência. Trabalhamos com as ferramentas que já tem, e só recomendamos algo novo se fizer falta real.",
  },
  {
    question: "O que acontece depois do diagnóstico comercial?",
    answer:
      "Se fizer sentido avançar, definimos em conjunto os próximos passos — não há nenhum compromisso automático depois do diagnóstico.",
  },
  {
    question: "Como sabemos se o processo está a funcionar?",
    answer:
      "Tem visibilidade sobre que empresas foram contactadas, com que critério, e em que fase — não é uma caixa fechada.",
  },
  {
    question: "Quanto tempo demora a ver o processo a funcionar de forma estável?",
    answer:
      "Varia consoante o setor e o ciclo de venda. No diagnóstico inicial damos uma ideia mais concreta para o seu caso, sem prometer um prazo genérico.",
  },
];

export default function SolucoesPmePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />

      <SolutionHero
        eyebrow="Soluções para PME"
        title="Porque a sua equipa comercial não precisa de crescer para vender mais"
        subtitle="Numa PME, cada hora da equipa comercial conta. Mostramos como estruturar a prospeção sem aumentar a estrutura — nem o orçamento."
        ctaHref="/contacto"
        ctaLabel="Pedir diagnóstico comercial"
        visual={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border">
            <Image
              src={heroImage}
              alt="Equipa pequena e focada a trabalhar em portáteis num escritório moderno"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
        }
      />

      <SolutionProblems
        eyebrow="Problemas mais comuns"
        title="Os problemas que mais limitam a prospeção numa PME"
        description="Cada um destes problemas é comum e resolúvel — não é sinal de que algo está fundamentalmente errado na empresa."
        problems={problems}
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
            <Image
              src={problemImage}
              alt="Empresário sobrecarregado com papelada na secretária, sinal de excesso de tarefas comerciais"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="Porque acontece" title="Porque é que estes problemas persistem" />
            <p className="text-base leading-relaxed text-foreground-muted">
              Nenhum destes problemas surge por falta de vontade. Surgem porque o tempo comercial
              disponível é sempre o primeiro a ser sacrificado quando há trabalho urgente — e porque
              é mais fácil adiar um processo do que interrompê-lo a meio.
            </p>
          </div>
        </Container>
      </section>

      <SolutionMistakes
        title="Os erros que mantêm o problema a repetir-se"
        mistakes={causes}
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Como resolvemos"
              title="Um processo de prospeção que não pede mais pessoas"
            />
            <p className="text-base leading-relaxed text-foreground-muted">
              A resposta mais comum a este problema é contratar mais uma pessoa para vendas. Nem
              sempre é possível, e nem sempre resolve — se o processo de prospeção não estiver
              definido, uma pessoa extra só reparte o mesmo caos por mais gente.
            </p>
            <p className="text-base leading-relaxed text-foreground-muted">
              Por isso começamos pelo processo, não pelo número de pessoas: definimos que empresas
              faz sentido contactar, com que critério, e em que ordem.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
            <Image
              src={processImage}
              alt="Equipa a apresentar uma estratégia comercial num escritório moderno"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <SolutionSteps
        eyebrow="Processo em etapas"
        title="Como aplicamos isto a uma equipa pequena"
        description="O mesmo processo, adaptado ao tempo real disponível — não um plano genérico."
        steps={steps}
      />

      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="relative mx-auto aspect-[21/9] w-full max-w-4xl overflow-hidden rounded-card border border-border">
            <Image
              src={benefitsImage}
              alt="Profissional com uma postura confiante, representando maior confiança no processo comercial"
              fill
              sizes="(min-width: 1024px) 70vw, 90vw"
              className="object-cover object-top"
            />
          </div>
        </Container>
      </section>

      <SolutionBenefits
        eyebrow="Benefícios"
        title="Efeitos possíveis deste processo"
        description="Estes são efeitos possíveis, não uma garantia de resultado — o que se observa depende sempre do contexto de cada empresa."
        benefits={benefits}
      />

      <SolutionCapabilities
        eyebrow="O que inclui"
        title="Serviços e capacidades relacionadas"
        description="Cada um destes pontos pode ser aplicado isoladamente ou em conjunto, consoante o que já existe no seu processo comercial."
        capabilities={capabilities}
      />

      <SolutionComparison
        eyebrow="Comparação"
        title="Abordagem desestruturada vs. abordagem organizada"
        rows={comparisonRows}
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border lg:order-2">
            <Image
              src={useCasesImage}
              alt="Dono de um pequeno negócio junto à porta da sua loja"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 lg:order-1">
            <Badge variant="accent">Casos de utilização</Badge>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Os cenários seguintes ilustram situações típicas em que esta forma de trabalhar costuma
              fazer mais sentido — não são casos de clientes reais.
            </p>
          </div>
        </Container>
      </section>

      <SolutionUseCases title="Situações onde isto costuma fazer diferença" useCases={useCases} />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
          <SectionHeading eyebrow="Perguntas frequentes" title="Antes de decidir" />
          <Accordion items={faqItems} />
        </Container>
      </section>

      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="relative mx-auto aspect-[21/9] w-full max-w-4xl overflow-hidden rounded-card border border-border">
            <Image
              src={ctaImage}
              alt="Equipa a colaborar numa mesa de escritório, representando o acompanhamento contínuo do processo"
              fill
              sizes="(min-width: 1024px) 70vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <SolutionCta
        title="Quer perceber se isto se aplica à sua equipa?"
        description="Não prometemos resultados sem conhecer o seu negócio. O primeiro passo é uma conversa para perceber se este processo se encaixa na sua realidade — sem compromisso."
        primaryHref="/contacto"
        primaryLabel="Pedir diagnóstico comercial"
        secondaryHref="/contacto"
        secondaryLabel="Falar connosco"
        reassurance="Sem compromisso. Sem promessas de resultado antes de conhecermos o seu negócio."
      />
    </>
  );
}
