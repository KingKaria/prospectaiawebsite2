import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Serviços",
  description: "Marketing digital, prospeção comercial, geração de leads e automação de processos comerciais.",
  path: "/servicos",
});

export default function ServicosPage() {
  return (
    <Container className="flex flex-col gap-6 py-20">
      <Badge variant="outline">Conteúdo provisório</Badge>
      <SectionHeading
        eyebrow="Serviços"
        title="Marketing digital e prospeção comercial, de ponta a ponta"
        description="A lista detalhada de serviços — prospeção online, geração de leads, automação de processos comerciais e otimização de vendas — será desenvolvida numa etapa posterior."
      />
    </Container>
  );
}
