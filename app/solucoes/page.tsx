import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Soluções",
  description: "Soluções de marketing e prospeção adaptadas a PME, agências, startups e equipas comerciais.",
  path: "/solucoes",
});

export default function SolucoesPage() {
  return (
    <Container className="flex flex-col gap-6 py-20">
      <Badge variant="outline">Conteúdo provisório</Badge>
      <SectionHeading
        eyebrow="Soluções"
        title="Soluções adaptadas ao seu tipo de negócio"
        description="Esta página irá detalhar as soluções para PME, empresas B2B, agências, startups e profissionais independentes. Estrutura em desenvolvimento."
      />
    </Container>
  );
}
