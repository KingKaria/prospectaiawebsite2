import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

/**
 * Renderizado uma única vez em app/layout.tsx. Representa as entidades
 * globais do site (Organization + WebSite) — não voltar a renderizar
 * nas páginas filhas para evitar duplicação de schema.
 */
export function GlobalJsonLd() {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
    </>
  );
}
