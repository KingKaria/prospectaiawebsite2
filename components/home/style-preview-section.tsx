import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion } from "@/components/ui/accordion";
import { Icon } from "@/components/ui/icon";
import { BarChart3, Target, Workflow } from "lucide-react";

const previewCards = [
  {
    icon: Target,
    title: "Prospeção orientada a dados",
    description: "Identificação de contactos e empresas alinhadas com o perfil de cliente ideal.",
  },
  {
    icon: Workflow,
    title: "Automação comercial",
    description: "Processos de aquisição estruturados, sem trabalho manual repetitivo.",
  },
  {
    icon: BarChart3,
    title: "Resultados mensuráveis",
    description: "Acompanhamento de oportunidades geradas e do impacto nas vendas.",
  },
];

const previewFaq = [
  {
    question: "Isto é conteúdo definitivo?",
    answer:
      "Não. Este bloco existe apenas para validar tipografia, cores, cartões, botões, formulário e accordion nesta etapa do projeto.",
  },
  {
    question: "Quando é substituído?",
    answer: "Numa etapa posterior, quando as secções finais da homepage forem desenvolvidas e aprovadas.",
  },
];

/**
 * Bloco de validação visual — não é conteúdo de marketing definitivo.
 * Serve para confirmar, nesta etapa, que os componentes base (Container,
 * Card, Badge, Button, Input, Textarea, Accordion, Icon) e os tokens de
 * cor/tipografia funcionam de forma consistente antes de se desenvolverem
 * as secções finais da homepage.
 */
export function StylePreviewSection() {
  return (
    <section className="py-20">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <Badge variant="outline">Validação interna · etapa 1</Badge>
          <SectionHeading
            title="Pré-visualização do design system"
            description="Bloco temporário para confirmar a identidade visual aplicada aos componentes base. Não é uma secção final da homepage."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {previewCards.map((item) => (
            <Card key={item.title}>
              <Icon icon={item.icon} className="text-cyan" size={24} />
              <h3 className="mt-4 text-base font-medium text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <Card className="flex flex-col gap-4">
          <p className="text-sm font-medium text-foreground">Estados de botão</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>
              Desativado
            </Button>
          </div>
        </Card>

        <Card as="article" className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Input id="preview-name" label="Nome" placeholder="O seu nome" />
            <Textarea id="preview-message" label="Mensagem" placeholder="Escreva aqui" />
          </div>
          <Accordion items={previewFaq} />
        </Card>
      </Container>
    </section>
  );
}
