import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { Link } from "@/components/ui/link";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description: "Fale com a equipa da ProspectAIA sobre marketing digital e prospeção comercial.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <Container className="flex flex-col gap-10 py-20">
      <SectionHeading
        eyebrow="Contacto"
        title="Vamos falar sobre o seu crescimento comercial"
        description="Preencha o formulário ou contacte-nos diretamente."
      />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <ContactForm />
        </Card>

        <Card className="flex flex-col gap-4 text-sm text-foreground-muted">
          <div>
            <p className="text-foreground font-medium">Email</p>
            <p>
              <Link href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</Link>
            </p>
          </div>
          <div>
            <p className="text-foreground font-medium">Telefone</p>
            <p>
              <Link href={`tel:${siteConfig.contactPhoneHref}`}>{siteConfig.contactPhone}</Link>
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
}
