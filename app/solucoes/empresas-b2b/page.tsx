import type { Metadata } from "next";
import Image from "next/image";
import {
  Users,
  Clock,
  GitBranch,
  Eye,
  ListFilter,
  Target,
  MessageSquare,
  Repeat,
  AlertTriangle,
  UserCheck,
  ClipboardList,
  Layers,
  ListChecks,
  Search,
  Workflow,
  Repeat2,
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

// Caminhos simples (não import estático) — mesmo motivo da página PME:
// evita depender de um transformador de assets que o Vitest não tem
// para imports estáticos de imagem.
const heroImage = "/images/solucoes/empresas-b2b/b2b-executivo-estrategia-janela.webp";
const problemImage = "/images/solucoes/empresas-b2b/b2b-reuniao-multiplos-intervenientes.webp";
const processImage = "/images/solucoes/empresas-b2b/b2b-reuniao-estrategia-corporativa.webp";
const benefitsImage = "/images/solucoes/empresas-b2b/b2b-profissionais-analise-conjunta.webp";
const useCasesImage = "/images/solucoes/empresas-b2b/b2b-reuniao-cenarios-comerciais.webp";
const ctaImage = "/images/solucoes/empresas-b2b/b2b-equipa-colaboracao-escritorio.webp";

const TITLE = "Soluções para Empresas B2B";
const DESCRIPTION =
  "Como estruturar a prospeção em torno de todo o ciclo de decisão de uma venda B2B — não apenas do primeiro contacto.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/solucoes/empresas-b2b",
});

const problems: SolutionProblem[] = [
  {
    icon: Users,
    title: "Dificuldade em identificar todos os intervenientes da decisão",
    description:
      "Não é sempre claro quem, dentro da empresa-alvo, tem autoridade para decidir — ou quem apenas influencia a decisão.",
    businessImpact:
      "Tempo investido numa relação comercial sem visibilidade sobre quem influencia, valida ou toma a decisão final.",
  },
  {
    icon: Clock,
    title: "Ciclos de venda longos sem acompanhamento estruturado",
    description:
      "Entre o primeiro contacto e a decisão final passam-se semanas ou meses, com múltiplas interações.",
    businessImpact: "Oportunidades que esfriam por falta de acompanhamento consistente ao longo do ciclo.",
  },
  {
    icon: GitBranch,
    title: "Múltiplos decisores com prioridades diferentes",
    description:
      "Uma proposta pode agradar ao departamento técnico e ainda assim ser travada pelo financeiro.",
    businessImpact: "Negócios que avançam numa área da empresa e ficam parados noutra.",
  },
  {
    icon: Eye,
    title: "Falta de visibilidade sobre o estado real de cada negócio",
    description:
      "Sem um processo estruturado, é difícil saber em que fase está cada oportunidade e o que falta para avançar.",
    businessImpact: "Decisões de gestão comercial tomadas com informação incompleta.",
  },
  {
    icon: ListFilter,
    title: "Prospeção genérica que não reflete a complexidade da venda B2B",
    description:
      "Uma abordagem pensada para vendas simples não considera os vários intervenientes de uma decisão empresarial.",
    businessImpact: "Esforço comercial desperdiçado em abordagens desajustadas a quem realmente compra.",
  },
];

const causes: SolutionMistake[] = [
  {
    title: "Tratar todos os contactos da empresa-alvo da mesma forma",
    consequence:
      "A mensagem pode não chegar à pessoa certa, no momento certo e com o contexto adequado ao seu papel na decisão.",
  },
  {
    title: "Avançar sem mapear os intervenientes da decisão",
    consequence:
      "Iniciar a prospeção sem perceber quem mais está envolvido na decisão obriga a recomeçar o processo mais tarde.",
  },
  {
    title: "Perder o fio ao longo de ciclos de venda longos",
    consequence:
      "Sem um processo de acompanhamento estruturado, o interesse inicial esfria antes da decisão ser tomada.",
  },
  {
    title: "Depender de um único ponto de contacto na empresa-alvo",
    consequence: "Se essa pessoa sai ou perde influência, o negócio inteiro fica em risco.",
  },
];

const steps: SolutionStep[] = [
  {
    title: "Diagnóstico comercial",
    description:
      "Percebemos como é hoje o ciclo de venda, quem costuma estar envolvido nas decisões e onde o processo atual perde tração.",
  },
  {
    title: "Mapeamento de decisores",
    description:
      "Identificamos, para cada empresa-alvo, quem decide, quem influencia e quem apenas utiliza a solução — com base em informação pública e no que nos for partilhado, nunca em investigação invasiva.",
  },
  {
    title: "Estrutura de prospeção multi-contacto",
    description:
      "Desenhamos uma abordagem que chega aos vários intervenientes da decisão, não apenas ao primeiro contacto.",
  },
  {
    title: "Acompanhamento ao longo do ciclo",
    description:
      "Mantemos o negócio ativo ao longo de todo o ciclo de decisão, ajustando a abordagem à medida que evolui.",
  },
];

const benefits: SolutionBenefit[] = [
  {
    icon: Target,
    title: "Foco nos intervenientes certos",
    description: "O esforço comercial é dirigido a quem realmente decide, influencia ou valida a proposta.",
    businessValue: "Menos tempo investido a convencer quem não tem poder de decisão final.",
  },
  {
    icon: Eye,
    title: "Visibilidade sobre o ciclo de decisão completo",
    description: "Fica claro quem está envolvido em cada negócio e em que fase se encontra.",
    businessValue: "Decisões de gestão comercial baseadas em informação, não em suposições.",
  },
  {
    icon: Users,
    title: "Menor dependência de um único contacto",
    description: "A relação comercial deixa de estar concentrada numa só pessoa da empresa-alvo.",
    businessValue: "Negócios que resistem à saída ou perda de influência de um contacto.",
  },
  {
    icon: MessageSquare,
    title: "Mensagem adaptada ao papel de cada interveniente",
    description: "Cada pessoa envolvida recebe uma abordagem ajustada ao seu papel na decisão.",
    businessValue: "Argumentos mais relevantes para quem decide, influencia ou utiliza a solução.",
  },
  {
    icon: Clock,
    title: "Continuidade ao longo de ciclos de venda prolongados",
    description: "O acompanhamento não depende de haver disponibilidade pontual para retomar o contacto.",
    businessValue: "Negócios que não esfriam entre reuniões.",
  },
  {
    icon: Repeat,
    title: "Processo replicável entre contas semelhantes",
    description: "Cada nova empresa-alvo beneficia de uma abordagem já testada, não de um recomeço.",
    businessValue: "Menos tempo a montar o processo do zero em cada negócio.",
  },
  {
    icon: ListFilter,
    title: "Priorização mais clara das contas-alvo",
    description: "Fica mais fácil perceber que empresas-alvo têm sinais reais de decisão em curso.",
    businessValue: "Tempo comercial dirigido às contas com maior probabilidade de avançar.",
  },
  {
    icon: AlertTriangle,
    title: "Identificação antecipada de bloqueios internos",
    description:
      "Sinais de resistência ou hesitação tornam-se visíveis antes de travarem o negócio por completo.",
    businessValue: "Menos negócios que ficam “parados” sem explicação aparente.",
  },
  {
    icon: UserCheck,
    title: "Maior alinhamento dentro da equipa comercial",
    description: "Toda a equipa trabalha com a mesma leitura sobre quem está envolvido em cada negócio.",
    businessValue: "Decisões mais consistentes, independentemente de quem acompanha o negócio.",
  },
  {
    icon: Repeat2,
    title: "Continuidade perante mudanças na equipa do cliente",
    description: "O processo não depende de uma única pessoa se manter no mesmo cargo na empresa-alvo.",
    businessValue: "Menor risco de perder o negócio quando alguém muda de função.",
  },
  {
    icon: ClipboardList,
    title: "Histórico organizado de interações e próximos passos",
    description: "Fica registado o que já foi falado, com quem, e o que falta acontecer.",
    businessValue: "Menos tempo perdido a reconstruir o histórico de cada negócio.",
  },
  {
    icon: Layers,
    title: "Base mais sólida para decisões comerciais",
    description:
      "Informação estruturada sobre cada negócio apoia decisões de priorização e investimento comercial.",
    businessValue: "Decisões de gestão comercial mais informadas, não baseadas em memória individual.",
  },
];

const capabilities: SolutionCapability[] = [
  {
    icon: ListChecks,
    title: "Diagnóstico comercial inicial",
    description: "Uma leitura ao ciclo de venda B2B atual, antes de qualquer alteração.",
    advantage: "Ponto de partida claro, sem suposições.",
  },
  {
    icon: Search,
    title: "Mapeamento de decisores",
    description:
      "Identificação dos intervenientes por empresa-alvo, com base em informação pública, dados fornecidos pelo cliente e contexto obtido de forma legítima durante o processo comercial — sempre com validação humana.",
    advantage: "Abordagem informada, sem acesso a dados privados.",
  },
  {
    icon: Workflow,
    title: "Estrutura de prospeção multi-contacto",
    description: "Uma abordagem que chega aos vários intervenientes da decisão, não apenas ao primeiro contacto.",
    advantage: "Prospeção que reflete a complexidade real da venda B2B.",
  },
  {
    icon: Repeat2,
    title: "Acompanhamento contínuo ao longo do ciclo",
    description: "Ajustes à abordagem à medida que o negócio evolui e novos intervenientes surgem.",
    advantage: "Um processo que acompanha o ciclo real, não um plano fixo.",
  },
];

const comparisonRows: SolutionComparisonRow[] = [
  {
    aspect: "Critério de contacto",
    unstructured: "Um único contacto, escolhido ao acaso",
    structured: "Vários intervenientes identificados por papel na decisão",
  },
  {
    aspect: "Continuidade ao longo do ciclo",
    unstructured: "Retomas dependentes da memória individual e de processos informais.",
    structured: "Acompanhamento estruturado até à decisão",
  },
  {
    aspect: "Visibilidade",
    unstructured: "Difícil saber em que fase está cada negócio",
    structured: "Fases e intervenientes claros para toda a equipa",
  },
  {
    aspect: "Resiliência",
    unstructured: "Negócio em risco se o contacto principal sair",
    structured: "Relação distribuída por vários decisores",
  },
  {
    aspect: "Escala",
    unstructured: "Cada negócio B2B recomeça do zero",
    structured: "Processo replicável entre empresas-alvo semelhantes",
  },
];

const useCases: SolutionUseCase[] = [
  {
    title: "Quando o negócio trava sem explicação aparente",
    scenario:
      "Uma proposta que agrada ao contacto principal mas nunca chega a avançar, porque outra área da empresa não foi envolvida na decisão.",
  },
  {
    title: "Quando o único contacto muda de função",
    scenario:
      "A pessoa com quem a relação comercial estava construída sai da empresa ou muda de área, e o negócio perde-se com ela.",
  },
  {
    title: "Quando o ciclo de venda se arrasta sem acompanhamento",
    scenario:
      "Uma oportunidade com potencial real que esfria porque, entre reuniões, ninguém retoma o contacto de forma consistente.",
  },
  {
    title: "Quando a equipa não sabe quem mais decide",
    scenario:
      "Uma negociação avançada é travada tardiamente por alguém que nunca tinha sido incluído nas conversas.",
  },
];

const faqItems: AccordionItemData[] = [
  {
    question: "O que muda em relação à prospeção para PME?",
    answer:
      "Nas PME, o principal desafio costuma ser a falta de tempo dedicado à prospeção. Em vendas B2B mais complexas, o desafio central é outro: identificar e acompanhar todos os intervenientes envolvidos numa decisão que raramente depende de uma só pessoa.",
  },
  {
    question: "Quanto tempo demora um ciclo de venda B2B típico?",
    answer:
      "Varia muito consoante o setor e a complexidade da decisão. Por isso começamos sempre por perceber o ciclo real da sua empresa, em vez de aplicar um prazo padrão.",
  },
  {
    question: "Como identificam quem realmente decide dentro da empresa-alvo?",
    answer:
      "Com base em informação pública, no que nos for partilhado pela sua equipa, e no contexto que se vai revelando ao longo do processo comercial — sempre com validação humana, nunca através de investigação invasiva.",
  },
  {
    question: "Isto funciona se já tivermos uma equipa comercial estruturada?",
    answer:
      "Sim. Trabalhamos com o processo e as pessoas que já existem, para tornar a prospeção mais estruturada, não para a substituir.",
  },
  {
    question: "E se ainda não soubermos quem são os decisores nas nossas contas-alvo?",
    answer: "Faz parte do diagnóstico inicial ajudar a identificar isso — não precisa de chegar já com essa informação.",
  },
  {
    question: "Isto substitui o nosso CRM ou ferramentas atuais?",
    answer:
      "Não. Trabalhamos com as ferramentas que já utiliza — não substituímos, nem prometemos integrações ou sincronizações automáticas com sistemas externos.",
  },
  {
    question: "Como se adapta isto a diferentes setores B2B?",
    answer:
      "O princípio de mapear o ciclo de decisão aplica-se a qualquer setor B2B; os critérios concretos e os intervenientes típicos variam consoante o negócio e são definidos no diagnóstico.",
  },
  {
    question: "O que acontece depois do diagnóstico comercial?",
    answer:
      "Se fizer sentido avançar, definimos em conjunto os próximos passos — não há nenhum compromisso automático depois do diagnóstico.",
  },
  {
    question: "Como sabemos se o processo está a funcionar num ciclo de venda longo?",
    answer:
      "Tem visibilidade sobre quem foi contactado, em que fase está cada negócio e o que falta para avançar — mesmo em ciclos mais longos.",
  },
  {
    question: "Isto funciona para vendas com poucas contas-alvo de valor elevado (account-based)?",
    answer:
      "Sim — o princípio aplica-se bem a vendas orientadas para um conjunto reduzido de contas-alvo estratégicas (por vezes chamadas de account-based selling), onde mapear os vários decisores de cada conta é ainda mais determinante.",
  },
  {
    question: "Como começamos?",
    answer: "Com um diagnóstico comercial inicial, sem compromisso, para perceber se faz sentido avançar.",
  },
];

export default function SolucoesEmpresasB2BPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />

      <SolutionHero
        eyebrow="Soluções para Empresas B2B"
        title="Porque o primeiro contacto raramente é o único a decidir"
        subtitle="Em vendas B2B, cada negócio passa por várias pessoas até ser decidido. Estruturamos a prospeção em torno de todo o ciclo de decisão da empresa-alvo — não apenas do primeiro contacto."
        ctaHref="/contacto"
        ctaLabel="Pedir diagnóstico comercial"
        visual={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border">
            <Image
              src={heroImage}
              alt="Executivo de fato junto a uma janela, a observar o horizonte de uma cidade, refletindo sobre estratégia"
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
        title="Os problemas que mais limitam a prospeção em vendas B2B"
        description="Cada um destes problemas é comum em vendas complexas — não é sinal de que algo está fundamentalmente errado no processo comercial."
        problems={problems}
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
            <Image
              src={problemImage}
              alt="Grupo de profissionais reunidos à mesa, em discussão sobre uma decisão empresarial"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="Porque acontece" title="Porque é que estes problemas persistem" />
            <p className="text-base leading-relaxed text-foreground-muted">
              Nenhum destes problemas surge por falta de preparação comercial. Surgem porque uma
              decisão empresarial raramente passa por uma só pessoa — e é mais fácil falar com quem já
              conhecemos do que mapear todos os que estão realmente envolvidos.
            </p>
          </div>
        </Container>
      </section>

      <SolutionMistakes title="Os erros que mantêm o problema a repetir-se" mistakes={causes} />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Como resolvemos"
              title="Um processo de prospeção pensado para decisões empresariais, não para um único contacto"
            />
            <p className="text-base leading-relaxed text-foreground-muted">
              A resposta mais comum a ciclos de venda longos é insistir mais junto do mesmo contacto.
              Nem sempre funciona — se a decisão depende de várias pessoas, falar apenas com uma delas
              raramente é suficiente.
            </p>
            <p className="text-base leading-relaxed text-foreground-muted">
              Por isso começamos por mapear quem, na empresa-alvo, está realmente envolvido na decisão —
              e estruturamos a prospeção em torno desse ciclo completo, não de um único contacto.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
            <Image
              src={processImage}
              alt="Equipa a apresentar uma estratégia comercial numa sala de reuniões corporativa"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <SolutionSteps
        eyebrow="Processo em etapas"
        title="Como aplicamos isto a uma venda B2B"
        description="O mesmo processo, adaptado ao ciclo de decisão real de cada empresa-alvo — não um plano genérico."
        steps={steps}
      />

      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-card border border-border">
            <Image
              src={benefitsImage}
              alt="Dois profissionais a analisar em conjunto informação num portátil"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <SolutionBenefits
        eyebrow="Benefícios"
        title="Efeitos possíveis deste processo"
        description="Estes são efeitos possíveis, não uma garantia de resultado — o que se observa depende sempre do contexto de cada negócio e de cada empresa-alvo."
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
        title="Abordagem pouco estruturada vs. abordagem estruturada"
        unstructuredLabel="Abordagem pouco estruturada"
        structuredLabel="Abordagem estruturada"
        rows={comparisonRows}
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border lg:order-2">
            <Image
              src={useCasesImage}
              alt="Grupo de profissionais em reunião de negócios, a discutir um cenário comercial"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 lg:order-1">
            <Badge variant="accent">Casos de utilização</Badge>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Os cenários seguintes ilustram situações típicas de vendas B2B em que esta forma de
              trabalhar costuma fazer mais sentido — não são casos de clientes reais.
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
          <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-card border border-border">
            <Image
              src={ctaImage}
              alt="Equipa a colaborar à volta de uma secretária num escritório"
              fill
              sizes="(min-width: 1024px) 70vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <SolutionCta
        title="Quer perceber se isto se aplica ao seu ciclo de venda?"
        description="Não prometemos resultados sem perceber como funciona hoje o seu ciclo de decisão. O primeiro passo é uma conversa para avaliar se este processo se aplica à sua realidade — sem compromisso."
        primaryHref="/contacto"
        primaryLabel="Pedir diagnóstico comercial"
        secondaryHref="/contacto"
        secondaryLabel="Falar connosco"
        reassurance="Sem compromisso. Sem promessas de resultado antes de percebermos como decide o seu mercado-alvo."
      />
    </>
  );
}
