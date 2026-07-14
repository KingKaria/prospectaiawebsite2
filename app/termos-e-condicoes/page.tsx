import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Termos e condições",
  description: "Termos e condições de utilização do website da ProspectAIA.",
  path: "/termos-e-condicoes",
});

export default function TermosECondicoesPage() {
  return (
    <Container className="flex flex-col gap-6 py-20">
      <Badge variant="outline">Conteúdo provisório — a rever juridicamente</Badge>
      <SectionHeading
        eyebrow="Legal"
        title="Termos e condições"
        description="Esta página irá conter os termos e condições definitivos de utilização do website, revistos antes do lançamento."
      />
    </Container>
  );
}
