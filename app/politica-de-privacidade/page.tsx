import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidade",
  description: "Política de privacidade da ProspectAIA.",
  path: "/politica-de-privacidade",
});

export default function PoliticaDePrivacidadePage() {
  return (
    <Container className="flex flex-col gap-6 py-20">
      <Badge variant="outline">Conteúdo provisório — a rever juridicamente</Badge>
      <SectionHeading
        eyebrow="Legal"
        title="Política de privacidade"
        description="Esta página irá conter a política de privacidade definitiva, revista de acordo com o RGPD, antes do lançamento do site."
      />
    </Container>
  );
}
