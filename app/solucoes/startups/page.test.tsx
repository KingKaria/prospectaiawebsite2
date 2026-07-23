import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import SolucoesStartupsPage, { metadata } from "@/app/solucoes/startups/page";
import { GlobalJsonLd } from "@/components/seo/global-json-ld";
import { siteConfig } from "@/lib/constants";

function extractJsonLd(html: string) {
  const matches = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
  return matches.map((match) => JSON.parse(match[1]));
}

describe("/solucoes/startups — dados estruturados", () => {
  const html = renderToStaticMarkup(
    <>
      <GlobalJsonLd />
      <SolucoesStartupsPage />
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

  it("tem exatamente 1 FAQPage com 12 perguntas", () => {
    const faq = byType("FAQPage");
    expect(faq).toHaveLength(1);
    expect(faq[0].mainEntity).toHaveLength(12);
  });

  it("a correspondência entre FAQ visível e JSON-LD é exata", () => {
    const faq = byType("FAQPage")[0];
    const jsonLdQuestions = faq.mainEntity.map((item: { name: string }) => item.name);
    const visibleQuestions = [...html.matchAll(/<summary[^>]*>.*?<\/summary>/g)];
    expect(jsonLdQuestions).toHaveLength(12);
    expect(visibleQuestions.length).toBeGreaterThanOrEqual(12);
    for (const question of jsonLdQuestions) {
      expect(html).toContain(question);
    }
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

describe("/solucoes/startups — metadata", () => {
  it("title é exatamente 'Soluções comerciais para Startups'", () => {
    expect(metadata.title).toBe("Soluções comerciais para Startups");
  });

  it("tem description não vazia e distinta da description genérica do site", () => {
    expect(metadata.description).toBeTruthy();
    expect(metadata.description).not.toBe(siteConfig.description);
  });

  it("canonical aponta para o path correto", () => {
    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/solucoes/startups`);
  });

  it("openGraph.url coincide com o canonical", () => {
    expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
  });
});

describe("/solucoes/startups — conteúdo", () => {
  const html = renderToStaticMarkup(<SolucoesStartupsPage />);
  const visibleText = html.replace(/<[^>]*>/g, " ");

  it("renderiza o H1 aprovado, uma única vez", () => {
    const matches = html.match(/<h1[\s>]/g) ?? [];
    expect(matches).toHaveLength(1);
    expect(visibleText).toContain("Antes de vender mais, é preciso perceber a quem vender");
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
    expect(visibleText.toLowerCase()).not.toContain("garante continuidade");
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

  it("usa 'Impacto no negócio' e 'Valor para a empresa', não linguagem absoluta sobre resultados", () => {
    expect(visibleText).toContain("Impacto no negócio:");
    expect(visibleText).toContain("Valor para a empresa:");
    expect(visibleText.toLowerCase()).not.toContain("nunca seriam clientes reais");
  });

  it("liga o CTA principal e o secundário a /contacto", () => {
    const contactLinks = [...html.matchAll(/href="\/contacto"/g)];
    expect(contactLinks.length).toBeGreaterThanOrEqual(3);
  });

  it("usa 'Pedir diagnóstico comercial', nunca 'Pedir demonstração'", () => {
    expect(visibleText).toContain("Pedir diagnóstico comercial");
    expect(visibleText.toLowerCase()).not.toContain("pedir demonstração");
  });

  it("não afirma substituir, integrar ou sincronizar com ferramentas externas sem ressalva", () => {
    const lower = visibleText.toLowerCase();
    expect(lower).not.toContain("integra automaticamente");
    expect(lower).not.toContain("sincroniza com o seu crm");
  });

  it("apresenta o perfil de cliente como hipótese de trabalho, não definição definitiva", () => {
    expect(visibleText).toContain("hipótese de trabalho");
  });

  it("não copia H1 nem descrição das páginas PME ou Empresas B2B", () => {
    expect(visibleText).not.toContain("Porque a sua equipa comercial não precisa de crescer para vender mais");
    expect(visibleText).not.toContain("Porque o primeiro contacto raramente é o único a decidir");
    expect(visibleText).toContain("Antes de vender mais, é preciso perceber a quem vender");
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

  it("usa apenas caminhos locais de imagem em /images/solucoes/startups/", () => {
    expect(html).toContain("%2Fimages%2Fsolucoes%2Fstartups%2F");
    expect(html).not.toContain("http://images.pexels.com");
    expect(html).not.toContain("https://images.pexels.com");
  });
});
