type JsonLdProps = {
  data: object;
};

export function JsonLd({ data }: JsonLdProps) {
  // Escapa "<" para impedir que um valor contendo "</script>" feche a tag
  // prematuramente — hardening recomendado pela documentação do Next.js
  // para dangerouslySetInnerHTML com JSON-LD, mesmo quando (como aqui) os
  // dados são sempre estáticos e controlados pelo próprio site.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
