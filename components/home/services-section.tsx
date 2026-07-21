import { Search, Users, Compass, Cog, LineChart, Globe, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { ServicesDiagram } from "@/components/home/services-diagram";

const acquisitionServices = [
  {
    icon: Globe,
    title: "Marketing digital",
    benefit: "Mais visibilidade onde os seus potenciais clientes já procuram soluções como a sua.",
  },
  {
    icon: Search,
    title: "Prospeção comercial online",
    benefit: "Contacto direto com empresas que correspondem ao seu perfil de cliente ideal.",
  },
  {
    icon: Users,
    title: "Geração de leads",
    benefit: "Contactos já filtrados, prontos para a sua equipa comercial abordar.",
  },
  {
    icon: Compass,
    title: "Estratégias de aquisição",
    benefit: "Um caminho definido até ao cliente, não uma campanha genérica.",
  },
];

const optimizationServices = [
  {
    icon: Cog,
    title: "Automação de processos comerciais",
    benefit: "Menos horas perdidas em tarefas repetitivas de prospeção.",
  },
  {
    icon: LineChart,
    title: "Otimização de processos de vendas",
    benefit: "Identificação exata de onde as oportunidades se estão a perder.",
  },
];

/**
 * Layout deliberadamente diferente da Hero (colunas texto+visual, mas
 * aqui assimétrico 0.85/1.15, sem CTAs em gradiente) e da Proposta de
 * Valor (sem sequência numerada horizontal). Lista editorial em vez de
 * cartões — ver ServicesDiagram para a lógica dos dois grupos.
 */
export function ServicesSection() {
  return (
    <section className="border-b border-border py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <div className="flex flex-col items-start gap-8 lg:sticky lg:top-24">
          <SectionHeading
            eyebrow="Serviços"
            title="Os serviços que geram oportunidades — e os que garantem que não se perdem."
            description="Os primeiros quatro serviços geram o fluxo de oportunidades comerciais; os últimos dois garantem que esse fluxo se converte em vendas com o mínimo de desperdício."
          />
          <ServicesDiagram />
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
              Aquisição
            </p>
            <ul className="mt-4 divide-y divide-border border-t border-border">
              {acquisitionServices.map((service) => (
                <li key={service.title} className="flex items-start gap-4 py-5">
                  <Icon icon={service.icon} size={18} className="mt-0.5 shrink-0 text-cyan" />
                  <div>
                    <h3 className="text-base font-medium text-foreground">{service.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                      {service.benefit}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-foreground-muted">
              Otimização
            </p>
            <ul className="mt-4 divide-y divide-border border-t border-border">
              {optimizationServices.map((service) => (
                <li key={service.title} className="flex items-start gap-4 py-5">
                  <Icon icon={service.icon} size={18} className="mt-0.5 shrink-0 text-violet-accent" />
                  <div>
                    <h3 className="text-base font-medium text-foreground">{service.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                      {service.benefit}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/servicos"
            className="inline-flex items-center gap-1.5 py-1.5 text-sm font-medium"
          >
            Ver todos os serviços
            <Icon icon={ArrowRight} size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
