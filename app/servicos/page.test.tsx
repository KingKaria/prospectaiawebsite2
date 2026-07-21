import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import ServicosPage from "@/app/servicos/page";
import { GlobalJsonLd } from "@/components/seo/global-json-ld";

function extractJsonLd(html: string) {
  const matches = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
  return matches.map((match) => JSON.parse(match[1]));
}

describe("/servicos — dados estruturados", () => {
  const html = renderToStaticMarkup(
    <>
      <GlobalJsonLd />
      <ServicosPage />
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

  it("tem exatamente 1 ItemList com 8 Service", () => {
    const itemLists = byType("ItemList");
    expect(itemLists).toHaveLength(1);
    expect(itemLists[0].itemListElement).toHaveLength(8);
    for (const item of itemLists[0].itemListElement) {
      expect(item["@type"]).toBe("Service");
    }
  });

  it("não tem nenhum FAQPage", () => {
    expect(byType("FAQPage")).toHaveLength(0);
  });

  it("não tem o WebPage da homepage", () => {
    expect(byType("WebPage")).toHaveLength(0);
  });

  it("não tem schemas duplicados (total de scripts = 3)", () => {
    expect(schemas).toHaveLength(3);
  });
});
