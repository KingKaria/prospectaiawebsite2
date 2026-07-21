import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

const benefits = [
  "Menos tempo da equipa comercial gasto em prospeção manual",
  "Contacto apenas com quem tem perfil real para comprar",
  "Processo de aquisição documentado e replicável, não dependente de uma pessoa",
  "Visibilidade sobre o que está, de facto, a gerar oportunidades",
  "Menor dependência de recomendações ou de leads pontuais",
  "Estrutura pronta para escalar sem contratar mais equipa comercial",
];

export function BenefitsSection() {
  return (
    <section className="border-b border-border py-20">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
        <SectionHeading
          eyebrow="Benefícios"
          title="O que muda no seu processo comercial"
        />

        <ul className="flex flex-col gap-4">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <Icon icon={CheckCircle2} size={20} className="mt-0.5 shrink-0 text-cyan" />
              <span className="text-sm leading-relaxed text-foreground-muted">{benefit}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
