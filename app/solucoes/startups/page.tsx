import type { Metadata } from "next";
import Image from "next/image";
import {
  Target,
  Layers,
  Users,
  PhoneOff,
  HelpCircle,
  BarChart3,
  Compass,
  MessageSquare,
  Repeat,
  ListFilter,
  Workflow,
  UserCheck,
  ListChecks,
  Repeat2,
  Eye,
  Sparkles,
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

// Caminhos simples (não import estático) — mesmo motivo da PME e da B2B:
// evita depender de um transformador de assets que o Vitest não tem
// para imports estáticos de imagem.
const heroImage = "/images/solucoes/startups/startups-fundador-validacao-comercial.webp";
const problemImage = "/images/solucoes/startups/startups-prioridades-comerciais-dispersas.webp";
const processImage = "/images/solucoes/startups/startups-equipa-planeamento-estrategia.webp";
const benefitsImage = "/images/solucoes/startups/startups-clareza-decisao-comercial.webp";
const useCasesImage = "/images/solucoes/startups/startups-equipa-cenarios-comerciais.webp";
const ctaImage = "/images/solucoes/startups/startups-colegas-revisao-documentos.webp";

const TITLE = "Soluções comerciais para Startups";
const DESCRIPTION =
  "Estruture os primeiros passos comerciais da sua startup com maior clareza sobre o cliente prioritário, aprendizagem organizada e um processo adequado à fase da empresa.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/solucoes/startups",
});

const problems: SolutionProblem[] = [
  {
    icon: Target,
    title: "Falta de clareza sobre o cliente ideal",
    description:
      "Sem um perfil definido, cada conversa comercial parte de pressupostos diferentes, e é difícil perceber que sinais realmente importam.",
    businessImpact:
      "Tempo investido em conversas com perfis pouco alinhados com o problema que a startup procura resolver.",
  },
  {
    icon: Layers,
    title: "Tentativa de vender a demasiados segmentos ao mesmo tempo",
    description:
      "Sem escolher uma direção, a mensagem tenta servir todos os públicos possíveis, e acaba por não convencer nenhum em particular.",
    businessImpact: "Esforço comercial disperso por públicos com necessidades muito diferentes entre si.",
  },
  {
    icon: Users,
    title: "Dependência total dos fundadores",
    description:
      "Toda a relação comercial passa por uma ou duas pessoas, sem que o conhecimento fique registado nem partilhado.",
    businessImpact:
      "Risco de perder contexto comercial valioso caso os fundadores fiquem sobrecarregados ou indisponíveis.",
  },
  {
    icon: PhoneOff,
    title: "Contactos sem processo de acompanhamento",
    description:
      "As primeiras conversas acontecem, mas sem um sistema para retomar contacto ou perceber o que ficou por responder.",
    businessImpact: "Oportunidades iniciais que podem perder continuidade por falta de acompanhamento consistente.",
  },
  {
    icon: HelpCircle,
    title: "Dificuldade em distinguir interesse real de curiosidade",
    description:
      "Nem toda a conversa entusiasmada se traduz em intenção real de compra, e sem critério é difícil perceber a diferença.",
    businessImpact: "Tempo investido em conversas cujo interesse ainda não estava suficientemente validado.",
  },
  {
    icon: BarChart3,
    title: "Falta de dados comerciais para decidir onde concentrar recursos",
    description:
      "Sem um registo mínimo das conversas comerciais, cada decisão sobre onde investir tempo é feita mais por intuição do que por padrão observado.",
    businessImpact: "Decisões de prioridade tomadas sem uma base comparável entre contactos.",
  },
];

const causes: SolutionMistake[] = [
  {
    title: "Tentar validar tudo ao mesmo tempo",
    consequence:
      "Cada conversa comercial testa uma ideia diferente, o que torna difícil comparar aprendizagens entre contactos — e a startup acaba por não acumular um conhecimento comercial coerente.",
  },
  {
    title: "Mudar a mensagem comercial a cada conversa, sem registar o que mudou",
    consequence:
      "É natural ajustar o discurso numa fase inicial, mas sem registar essas alterações é fácil repetir tentativas já feitas antes, sem perceber que já tinham sido experimentadas.",
  },
  {
    title: "Tratar cada contacto comercial como um caso isolado",
    consequence:
      "Sem um processo mínimo, cada conversa começa do zero, mesmo quando há padrões que se repetem — e a aprendizagem fica presa na memória de quem teve a conversa, em vez de ficar disponível para toda a equipa.",
  },
  {
    title: "Adotar ferramentas ou processos pensados para empresas maiores",
    consequence:
      "Estas ferramentas podem ser úteis mais tarde, quando a equipa e o volume de contactos crescerem — mas usá-las antes de existir essa necessidade real acrescenta estrutura que a startup ainda não precisa, e consome tempo que podia ser gasto a vender.",
  },
];

const steps: SolutionStep[] = [
  {
    title: "Diagnóstico da fase comercial",
    description:
      "Percebemos em que fase está a sua startup: se ainda está a validar o mercado, a procurar os primeiros clientes, ou a estruturar um processo já existente.",
  },
  {
    title: "Definição ou revisão do perfil de cliente",
    description:
      "Ajudamos a clarificar, com base nas conversas já tidas, que tipo de cliente faz mais sentido priorizar agora — uma hipótese de trabalho que pode evoluir, não uma definição fechada.",
  },
  {
    title: "Estruturação da abordagem inicial",
    description:
      "Desenhamos uma forma simples de abordar os primeiros contactos, adequada aos recursos que a startup já tem.",
  },
  {
    title: "Acompanhamento e aprendizagem",
    description:
      "Criamos uma forma simples de organizar o contexto das conversas, para que a aprendizagem não dependa apenas da memória de quem participou.",
  },
  {
    title: "Criação de uma base comercial replicável",
    description:
      "O que demonstra maior utilidade nesta fase fica documentado de forma simples, para poder ser revisto e desenvolvido com a equipa.",
  },
];

const benefits: SolutionBenefit[] = [
  {
    icon: Compass,
    title: "Maior clareza sobre quem abordar",
    description: "Fica mais fácil perceber que tipo de contacto faz sentido priorizar nesta fase.",
    businessValue: "Maior concentração em perfis mais alinhados com a hipótese comercial atual.",
  },
  {
    icon: ListChecks,
    title: "Aprendizagem comercial organizada",
    description: "Cada conversa fica registada de forma simples, em vez de se perder na memória de quem a teve.",
    businessValue: "Padrões que se repetem entre contactos tornam-se visíveis, em vez de passarem despercebidos.",
  },
  {
    icon: Target,
    title: "Menor dispersão de esforço comercial",
    description: "O foco deixa de estar em agradar a todos os segmentos possíveis ao mesmo tempo.",
    businessValue: "Mais atenção a conversas com maior relevância para a validação comercial.",
  },
  {
    icon: Repeat,
    title: "Continuidade entre contactos",
    description: "Um contacto inicial deixa de se perder por falta de acompanhamento.",
    businessValue: "Maior continuidade entre a conversa inicial e os próximos passos acordados.",
  },
  {
    icon: MessageSquare,
    title: "Mensagens comerciais mais consistentes",
    description: "As alterações à forma de comunicar ficam registadas, em vez de se perderem entre conversas.",
    businessValue: "Menos repetição de tentativas já testadas antes.",
  },
  {
    icon: ListFilter,
    title: "Melhor priorização de recursos comerciais",
    description: "Fica mais claro onde vale a pena investir tempo comercial nesta fase.",
    businessValue: "Decisões de prioridade apoiadas em padrões observados, não só em intuição.",
  },
  {
    icon: Layers,
    title: "Estrutura que evolui com a startup",
    description: "O processo cresce à medida que a equipa cresce, sem ter de ser reconstruído do zero.",
    businessValue: "Menos tempo perdido a substituir processos que já não servem a fase atual.",
  },
  {
    icon: Users,
    title: "Menor dependência da memória dos fundadores",
    description: "O conhecimento comercial deixa de estar apenas na cabeça de quem teve as conversas.",
    businessValue: "Continuidade comercial mesmo que os fundadores fiquem menos disponíveis para vendas.",
  },
  {
    icon: UserCheck,
    title: "Melhor passagem de contexto para futuras contratações",
    description: "Quando entra alguém novo para a área comercial, há um histórico organizado para consultar.",
    businessValue: "Menos tempo perdido a reconstruir aprendizagem que já existia.",
  },
  {
    icon: Eye,
    title: "Visibilidade sobre sinais de interesse real",
    description:
      "Fica mais fácil perceber, ao longo do tempo, se um contacto está genuinamente interessado ou apenas curioso.",
    businessValue: "Melhor distinção entre curiosidade inicial, problema reconhecido e intenção de continuar a conversa.",
  },
  {
    icon: Sparkles,
    title: "Base para decisões comerciais futuras",
    description: "As conversas já tidas tornam-se um ponto de partida para decidir os próximos passos comerciais.",
    businessValue: "Decisões apoiadas em aprendizagem acumulada, não só em intuição pontual.",
  },
  {
    icon: Workflow,
    title: "Redução de processos desnecessariamente complexos",
    description: "A estrutura fica ajustada ao que a startup realmente precisa agora, sem peso desnecessário.",
    businessValue: "Mais tempo disponível para vender, menos tempo a gerir o próprio processo.",
  },
];

const capabilities: SolutionCapability[] = [
  {
    icon: ListChecks,
    title: "Diagnóstico da fase comercial",
    description: "Uma leitura ao momento atual da startup, antes de qualquer alteração ao processo.",
    advantage: "Ponto de partida ajustado à fase real, sem aplicar um processo genérico.",
  },
  {
    icon: Target,
    title: "Definição de perfil de cliente inicial",
    description:
      "Apoio a clarificar, com base em conversas já tidas, que tipo de cliente faz mais sentido priorizar — uma hipótese de trabalho que evolui à medida que se aprende mais.",
    advantage: "Menos tempo gasto a validar com perfis pouco alinhados.",
  },
  {
    icon: Repeat2,
    title: "Estrutura de acompanhamento de contactos",
    description: "Uma estrutura simples que ajuda a organizar conversas, próximos passos e retomas de contacto.",
    advantage: "Continuidade comercial sem exigir ferramentas complexas.",
  },
  {
    icon: Workflow,
    title: "Organização da aprendizagem comercial",
    description:
      "Registo estruturado do que já foi testado, para que a aprendizagem fique disponível para toda a equipa.",
    advantage: "Base sólida para decisões comerciais futuras, incluindo para quem entrar mais tarde na equipa.",
  },
];

const comparisonRows: SolutionComparisonRow[] = [
  {
    aspect: "Definição de mercado",
    unstructured: "Tenta-se agradar a vários segmentos ao mesmo tempo",
    structured: "Foco claro no perfil de cliente prioritário nesta fase",
  },
  {
    aspect: "Seleção de contactos",
    unstructured: "Feita de forma pontual, sem critério definido",
    structured: "Baseada no perfil prioritário e nos padrões observados nas conversas anteriores",
  },
  {
    aspect: "Mensagem comercial",
    unstructured: "Muda a cada conversa, sem registo do que já foi testado",
    structured: "Evolui de forma registada, com aprendizagem acumulada",
  },
  {
    aspect: "Acompanhamento",
    unstructured: "Depende de lembrar manualmente de retomar contacto",
    structured: "Estrutura simples para organizar retomas e próximos passos",
  },
  {
    aspect: "Aprendizagem",
    unstructured: "Fica na memória de quem teve a conversa",
    structured: "Fica registada e disponível para toda a equipa",
  },
  {
    aspect: "Preparação para crescimento da equipa",
    unstructured: "Cada nova pessoa recomeça do zero",
    structured: "Histórico organizado facilita a entrada de novas pessoas",
  },
];

const useCases: SolutionUseCase[] = [
  {
    title: "Quando o fundador fala com várias pessoas, mas não consegue perceber padrões",
    scenario:
      "Depois de várias conversas com potenciais clientes, fica difícil lembrar o que foi dito a quem, e que padrões se repetem entre elas.",
  },
  {
    title: "Quando a startup tenta vender simultaneamente a vários setores",
    scenario:
      "Sem escolher uma direção, a mensagem comercial tenta servir públicos com necessidades muito diferentes entre si.",
  },
  {
    title: "Quando os primeiros contactos não têm acompanhamento consistente",
    scenario: "Uma conversa inicial promissora perde-se porque ninguém retoma o contacto no momento certo.",
  },
  {
    title: "Quando entra uma nova pessoa para a área comercial sem histórico organizado",
    scenario:
      "A pessoa que chega tem de recomeçar a aprender tudo o que já tinha sido descoberto antes, porque não ficou registado em lado nenhum.",
  },
];

const faqItems: AccordionItemData[] = [
  {
    question: "Isto é adequado a uma startup ainda em fase de validação?",
    answer:
      "Sim — é precisamente nessa fase que a aprendizagem organizada faz mais diferença, antes de qualquer processo ser ampliado.",
  },
  {
    question: "É preciso já ter equipa comercial?",
    answer: "Não. Trabalhamos frequentemente com startups em que os fundadores ainda fazem as vendas diretamente.",
  },
  {
    question: "Ajuda a definir o cliente ideal?",
    answer:
      "Ajudamos a clarificar, com base nas conversas já tidas, que tipo de cliente faz mais sentido priorizar agora. Este perfil inicial é uma hipótese de trabalho, não uma definição definitiva — evolui à medida que há mais conversas e mais aprendizagem.",
  },
  {
    question: "E se ainda estivermos a ajustar o produto?",
    answer: "Não há problema. A aprendizagem comercial pode acontecer em paralelo com os ajustes ao produto.",
  },
  {
    question: "Isto substitui o trabalho comercial dos fundadores?",
    answer:
      "Não. Trabalhamos com a estrutura que já existe, para tornar esse trabalho mais organizado — não para o substituir.",
  },
  {
    question: "Como evitam criar um processo demasiado pesado para esta fase?",
    answer:
      "Começamos sempre pelo diagnóstico da fase atual, e propomos apenas a estrutura mínima adequada a essa fase — não um processo pensado para uma empresa maior.",
  },
  {
    question: "Funciona para vendas B2B?",
    answer:
      "Sim, o princípio aplica-se bem a startups B2B; os critérios concretos são definidos consoante o setor e a fase da empresa.",
  },
  {
    question: "Funciona com poucas contas-alvo?",
    answer:
      "Sim — nesta fase, é comum haver poucos contactos possíveis, e é precisamente por isso que aprender com cada um deles de forma organizada faz diferença.",
  },
  {
    question: "O que acontece depois do diagnóstico comercial?",
    answer:
      "Se fizer sentido avançar, definimos em conjunto os próximos passos — não há nenhum compromisso automático depois do diagnóstico.",
  },
  {
    question: "Como acompanhamos a aprendizagem comercial nesta fase?",
    answer:
      "Através de sinais reais e observáveis — por exemplo, problemas mencionados repetidamente, perfis que demonstram maior alinhamento, objeções recorrentes, disponibilidade para um próximo passo, ou hipóteses que foram confirmadas, enfraquecidas ou que precisam de novo teste. Não criamos indicadores artificiais só para haver números.",
  },
  {
    question: "Isto substitui o nosso CRM ou outras ferramentas?",
    answer:
      "Não. Trabalhamos com as ferramentas que já utiliza, ou com algo simples se ainda não tiver nenhuma — não substituímos, nem prometemos integrações ou sincronizações automáticas.",
  },
  {
    question: "Como começamos?",
    answer: "Com um diagnóstico comercial inicial, sem compromisso, para perceber em que fase está a sua startup e se faz sentido avançar.",
  },
];

export default function SolucoesStartupsPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />

      <SolutionHero
        eyebrow="Soluções comerciais para Startups"
        title="Antes de vender mais, é preciso perceber a quem vender"
        subtitle="Estruturamos os primeiros passos comerciais de uma startup, para que cada contacto ajude a perceber melhor quem é, de facto, o cliente certo."
        ctaHref="/contacto"
        ctaLabel="Pedir diagnóstico comercial"
        visual={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border">
            <Image
              src={heroImage}
              alt="Fundador a escrever e a rever documentos à secretária, sob a luz de um candeeiro, numa sessão de trabalho concentrada"
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
        title="Os problemas que mais limitam a prospeção numa startup"
        description="Cada um destes problemas é comum nesta fase — não é sinal de que algo está fundamentalmente errado na empresa."
        problems={problems}
      />

      <section className="border-b border-border py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
            <Image
              src={problemImage}
              alt="Fundador a analisar um documento com atenção, refletindo sobre várias direções comerciais possíveis"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="Porque acontece" title="Porque é que estes problemas persistem" />
            <p className="text-base leading-relaxed text-foreground-muted">
              Nenhum destes problemas surge por falta de esforço. Surgem porque, numa fase inicial, há
              sempre mais hipóteses para testar do que tempo para as testar todas com igual atenção — e
              é mais fácil seguir em frente do que parar para registar o que já foi aprendido.
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
              title="Um processo comercial pensado para a fase em que a sua startup está agora"
            />
            <p className="text-base leading-relaxed text-foreground-muted">
              A resposta mais comum é tentar aplicar, desde já, um processo comercial pensado para uma
              empresa maior. Nem sempre funciona — um processo pesado, numa fase inicial, consome tempo
              que a startup pode não ter disponível para gastar em burocracia.
            </p>
            <p className="text-base leading-relaxed text-foreground-muted">
              Por isso começamos pela fase real da empresa: o que já foi testado, o que ainda falta
              validar, e que estrutura mínima faz sentido agora — não necessariamente daqui a um ano.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
            <Image
              src={processImage}
              alt="Duas pessoas em discussão junto a um portátil, a planear uma abordagem comercial"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <SolutionSteps
        eyebrow="Processo em etapas"
        title="Como aplicamos isto a uma startup"
        description="O mesmo processo, adaptado à fase real da empresa — não um plano genérico."
        steps={steps}
      />

      <section className="pt-16 sm:pt-20">
        <Container>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-card border border-border">
            <Image
              src={benefitsImage}
              alt="Duas pessoas a apontar e a rever em conjunto um parágrafo de um documento, com foco e atenção"
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
        description="Estes são efeitos possíveis, não uma garantia de resultado — o que se observa depende sempre do contexto de cada startup."
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
              alt="Pequena equipa em conversa informal e genuína, sem olhar para a câmara"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 lg:order-1">
            <Badge variant="accent">Casos de utilização</Badge>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Os cenários seguintes ilustram situações típicas de startups em que esta forma de
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
              alt="Dois colegas a folhear e a rever um documento em conjunto, junto a uma janela"
              fill
              sizes="(min-width: 1024px) 70vw, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <SolutionCta
        title="Quer perceber se isto se aplica à fase da sua startup?"
        description="O primeiro passo é uma conversa para perceber se este processo se encaixa na fase em que a sua startup está agora — antes de qualquer alteração ao que já existe."
        primaryHref="/contacto"
        primaryLabel="Pedir diagnóstico comercial"
        secondaryHref="/contacto"
        secondaryLabel="Falar connosco"
        reassurance="Sem compromisso. Não assumimos que já tem equipa, orçamento ou processo comercial definido."
      />
    </>
  );
}
