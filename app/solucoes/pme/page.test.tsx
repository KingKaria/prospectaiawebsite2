import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import SolucoesPmePage, { metadata } from "@/app/solucoes/pme/page";
import { GlobalJsonLd } from "@/components/seo/global-json-ld";
import { siteConfig } from "@/lib/constants";

function extractJsonLd(html: string) {
  const matches = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
  return matches.map((match) => JSON.parse(match[1]));
}

describe("/solucoes/pme — dados estruturados", () => {
  const html = renderToStaticMarkup(
    <>
      <GlobalJsonLd />
      <SolucoesPmePage />
    </>
  );
  const schemas = extractJsonLd(html);
  const byType = (type: string) => schemas.filter((schema) => schema["@type"] === type);

  it("tem exatamente 1 Organization", () => {
    expect(byType("Organization")).toHaveLength(1);
  });

  it("tem exatamente 1 WebSite", () => {
    expect(byType("WebSite")).toHaveLength(1);
  });

  it("tem exatamente 1 FAQPage com 11 perguntas", () => {
    const faq = byType("FAQPage");
    expect(faq).toHaveLength(1);
    expect(faq[0].mainEntity).toHaveLength(11);
  });

  it("não tem nenhum WebPage, Service, ItemList nem BreadcrumbList", () => {
    expect(byType("WebPage")).toHaveLength(0);
    expect(byType("Service")).toHaveLength(0);
    expect(byType("ItemList")).toHaveLength(0);
    expect(byType("BreadcrumbList")).toHaveLength(0);
  });

  it("não tem schemas duplicados (total de scripts = 3)", () => {
    expect(schemas).toHaveLength(3);
  });
});

describe("/solucoes/pme — metadata", () => {
  it("title é exatamente 'Soluções para PME'", () => {
    expect(metadata.title).toBe("Soluções para PME");
  });

  it("tem description não vazia e distinta da description genérica do site", () => {
    expect(metadata.description).toBeTruthy();
    expect(metadata.description).not.toBe(siteConfig.description);
  });

  it("canonical aponta para o path correto", () => {
    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/solucoes/pme`);
  });

  it("openGraph.url coincide com o canonical", () => {
    expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
  });
});

describe("/solucoes/pme — conteúdo", () => {
  const html = renderToStaticMarkup(<SolucoesPmePage />);
  const visibleText = html.replace(/<[^>]*>/g, " ");

  it("tem exatamente um h1", () => {
    const matches = html.match(/<h1[\s>]/g) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("tem pelo menos 6 h2 e vários h3", () => {
    const h2 = html.match(/<h2[\s>]/g) ?? [];
    const h3 = html.match(/<h3[\s>]/g) ?? [];
    expect(h2.length).toBeGreaterThanOrEqual(6);
    expect(h3.length).toBeGreaterThan(10);
  });

  it("nunca usa percentagens nem promessas de resultado garantido no texto visível", () => {
    expect(visibleText).not.toMatch(/\d+\s?%/);
    expect(visibleText.toLowerCase()).not.toContain("garantimos");
    expect(visibleText.toLowerCase()).not.toContain("garante resultados");
  });

  it("nunca usa gatilhos de escassez/urgência falsa", () => {
    const lower = visibleText.toLowerCase();
    expect(lower).not.toContain("vagas limitadas");
    expect(lower).not.toContain("últimas oportunidades");
    expect(lower).not.toContain("por tempo limitado");
  });

  it("identifica os casos de utilização como cenários ilustrativos, não casos de clientes reais", () => {
    expect(visibleText).toContain("Cenário ilustrativo — não representa um caso de cliente específico.");
  });

  it("usa 'Impacto no negócio' e 'Valor para a empresa', não 'impacto financeiro' nem 'resultado esperado'", () => {
    expect(visibleText).toContain("Impacto no negócio:");
    expect(visibleText).toContain("Valor para a empresa:");
    expect(visibleText.toLowerCase()).not.toContain("impacto financeiro");
    expect(visibleText.toLowerCase()).not.toContain("resultado esperado");
  });

  it("liga o CTA principal e o secundário a /contacto", () => {
    const contactLinks = [...html.matchAll(/href="\/contacto"/g)];
    expect(contactLinks.length).toBeGreaterThanOrEqual(3);
  });

  it("usa 'Pedir diagnóstico comercial', nunca 'Pedir demonstração'", () => {
    expect(visibleText).toContain("Pedir diagnóstico comercial");
    expect(visibleText.toLowerCase()).not.toContain("pedir demonstração");
  });

  it("tem 6 imagens com atributo alt não vazio", () => {
    const imgTags = [...html.matchAll(/<img[^>]*>/g)].map((match) => match[0]);
    expect(imgTags).toHaveLength(6);
    for (const tag of imgTags) {
      const altMatch = tag.match(/alt="([^"]*)"/);
      expect(altMatch).not.toBeNull();
      expect(altMatch?.[1].length).toBeGreaterThan(10);
    }
  });
});
