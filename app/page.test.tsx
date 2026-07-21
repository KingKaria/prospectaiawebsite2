import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage, { metadata as homeMetadata } from "@/app/page";
import { GlobalJsonLd } from "@/components/seo/global-json-ld";
import { homepageWebPageSchema, websiteSchema } from "@/lib/structured-data";
import { homeTitle, homeDescription, homeUrl } from "@/lib/constants";

function extractJsonLd(html: string) {
  const matches = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
  return matches.map((match) => JSON.parse(match[1]));
}

describe("homepage — dados estruturados", () => {
  const html = renderToStaticMarkup(
    <>
      <GlobalJsonLd />
      <HomePage />
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

  it("tem exatamente 1 WebPage", () => {
    expect(byType("WebPage")).toHaveLength(1);
  });

  it("tem exatamente 1 FAQPage com 4 perguntas", () => {
    const faq = byType("FAQPage");
    expect(faq).toHaveLength(1);
    expect(faq[0].mainEntity).toHaveLength(4);
  });

  it("não tem nenhum Service nem ItemList", () => {
    expect(byType("Service")).toHaveLength(0);
    expect(byType("ItemList")).toHaveLength(0);
  });

  it("não tem schemas duplicados (total de scripts = 4)", () => {
    expect(schemas).toHaveLength(4);
  });
});

describe("homepage — metadata reutiliza a mesma fonte que o JSON-LD", () => {
  it("title.absolute é exatamente homeTitle (ignora o template do layout)", () => {
    expect(homeMetadata.title).toEqual({ absolute: homeTitle });
  });

  it("description é exatamente homeDescription", () => {
    expect(homeMetadata.description).toBe(homeDescription);
  });

  it("alternates.canonical é exatamente homeUrl", () => {
    expect(homeMetadata.alternates?.canonical).toBe(homeUrl);
  });

  it("description da metadata coincide com a description do WebPage e do WebSite", () => {
    expect(homeMetadata.description).toBe(homepageWebPageSchema().description);
    expect(homeMetadata.description).toBe(websiteSchema().description);
  });

  it("canonical da metadata coincide com o url do WebPage e do WebSite", () => {
    expect(homeMetadata.alternates?.canonical).toBe(homepageWebPageSchema().url);
    expect(homeMetadata.alternates?.canonical).toBe(websiteSchema().url);
  });
});
