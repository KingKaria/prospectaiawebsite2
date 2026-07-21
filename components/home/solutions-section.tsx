import { Building2, Briefcase, Rocket, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

const segments = [
  {
    icon: Building2,
    title: "PME",
    description: "Apoio a equipas comerciais pequenas que precisam de encontrar clientes sem aumentar a estrutura.",
  },
  {
    icon: Briefcase,
    title: "Empresas B2B",
    description: "Prospeção orientada a ciclos de venda mais longos e a decisores específicos.",
  },
  {
    icon: Rocket,
    title: "Startups",
    description: "Validação e escala dos primeiros canais de aquisição de clientes.",
  },
  {
    icon: UserCheck,
    title: "Agências e profissionais independentes",
    description: "Geração de oportunidades comerciais previsível, sem depender apenas de recomendações.",
  },
];

export function SolutionsSection() {
  return (
    <section className="border-b border-border py-20">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Soluções"
          title="Adaptamo-nos ao tipo de negócio e ao ciclo de venda"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {segments.map((segment) => (
            <Card key={segment.title} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
              <Icon icon={segment.icon} size={24} className="text-violet-accent shrink-0" />
              <div>
                <h3 className="text-base font-medium text-foreground">{segment.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {segment.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
