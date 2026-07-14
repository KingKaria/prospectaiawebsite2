import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sobre",
  description: "Conheça a abordagem da ProspectAIA à prospeção comercial e ao marketing orientado a dados.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <Container className="flex flex-col gap-6 py-20">
      <Badge variant="outline">Conteúdo provisório</Badge>
      <SectionHeading
        eyebrow="Sobre nós"
        title="Uma equipa focada em dados, estratégia e resultados comerciais"
        description="Esta página será desenvolvida numa etapa posterior, com a história, missão e equipa reais da empresa. Por agora, serve apenas para validar a estrutura de navegação."
      />
    </Container>
  );
}
