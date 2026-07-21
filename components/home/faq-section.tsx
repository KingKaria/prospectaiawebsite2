import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";
import { faqSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";

const faqItems: AccordionItemData[] = [
  {
    question: "Para que tipo de empresa é este serviço?",
    answer:
      "Trabalhamos sobretudo com PME, empresas B2B, agências, startups e profissionais independentes que precisam de um processo estruturado para encontrar novos clientes.",
  },
  {
    question: "Preciso de já ter uma equipa comercial?",
    answer:
      "Não. Ajudamos tanto empresas sem processo comercial definido como equipas que já vendem e querem tornar a prospeção mais eficiente.",
  },
  {
    question: "O trabalho começa sempre da mesma forma?",
    answer:
      "Sim: começa sempre por um diagnóstico comercial, para perceber o ciclo de vendas atual e o perfil de cliente antes de definir qualquer estratégia.",
  },
  {
    question: "Como sei se está a funcionar?",
    answer:
      "Terá visibilidade sobre indicadores como oportunidades geradas, taxa de resposta e origem das oportunidades, desde o início do processo.",
  },
];

export function FaqSection() {
  return (
    <section className="border-b border-border py-20">
      <JsonLd data={faqSchema(faqItems)} />
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <SectionHeading eyebrow="Perguntas frequentes" title="Antes de nos contactar" />
        <Accordion items={faqItems} />
      </Container>
    </section>
  );
}
