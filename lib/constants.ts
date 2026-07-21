export const siteConfig = {
  name: "ProspectAIA",
  legalName: "ProspectAIA (nome provisório, a confirmar)",
  tagline: "Dados. Estratégia. Resultados.",
  description:
    "Marketing digital, prospeção comercial online e geração de oportunidades para empresas B2B, PME e equipas comerciais.",
  // Domínio provisório — substituir pelo domínio final antes de produção.
  url: "https://www.prospectaia.pt",
  contactEmail: "contacto@prospectaia.pt",
  // Formato de exibição (com espaços) e formato compacto para "tel:" e
  // dados estruturados (sem espaços, apenas dígitos com "+").
  contactPhone: "+351 937 158 315",
  contactPhoneHref: "+351937158315",
  locale: "pt_PT",
} as const;

export const NAV_LABEL_HOME = "Início";

// Fonte única (title, description, URL canónica) da homepage — reutilizada
// em app/layout.tsx, na metadata de app/page.tsx e em
// lib/structured-data.ts (websiteSchema, homepageWebPageSchema). Não
// copiar estes valores manualmente noutros ficheiros.
export const homeTitle = `${siteConfig.name} — ${siteConfig.tagline}`;
export const homeDescription = siteConfig.description;
export const homeUrl = `${siteConfig.url}/`;

// WhatsApp — número em formato internacional, apenas dígitos (sem "+",
// espaços ou traços), conforme exigido pela API https://wa.me/.
export const whatsappNumber = "351937158315";
export const whatsappMessage =
  "Olá! Gostaria de saber mais sobre os serviços da ProspectAIA.";
