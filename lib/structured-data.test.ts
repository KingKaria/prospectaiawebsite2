import { describe, expect, it } from "vitest";
import {
  organizationSchema,
  websiteSchema,
  homepageWebPageSchema,
  faqSchema,
  servicesSchema,
} from "@/lib/structured-data";
import { siteConfig, homeTitle, homeDescription, homeUrl } from "@/lib/constants";

function isAbsoluteUrl(value: string) {
  return /^https?:\/\//.test(value);
}

describe("organizationSchema", () => {
  const org = organizationSchema();

  it("tem @context e @type corretos", () => {
    expect(org["@context"]).toBe("https://schema.org");
    expect(org["@type"]).toBe("Organization");
  });

  it("tem @id estável", () => {
    expect(org["@id"]).toBe(`${siteConfig.url}/#organization`);
  });

  it("usa URL absoluta", () => {
    expect(isAbsoluteUrl(org.url)).toBe(true);
    expect(org.url).not.toContain("localhost");
  });

  it("tem nome e descrição não vazios", () => {
    expect(org.name).toBe(siteConfig.name);
    expect(org.description.length).toBeGreaterThan(0);
  });
});

describe("websiteSchema", () => {
  const site = websiteSchema();

  it("tem @context e @type corretos", () => {
    expect(site["@context"]).toBe("https://schema.org");
    expect(site["@type"]).toBe("WebSite");
  });

  it("tem @id estável", () => {
    expect(site["@id"]).toBe(`${siteConfig.url}/#website`);
  });

  it("url é exatamente a fonte única homeUrl", () => {
    expect(site.url).toBe(homeUrl);
    expect(isAbsoluteUrl(site.url)).toBe(true);
    expect(site.url.endsWith("/")).toBe(true);
    expect(site.url).not.toContain("localhost");
  });

  it("tem nome correto", () => {
    expect(site.name).toBe(siteConfig.name);
  });

  it("descrição é exatamente a fonte única homeDescription", () => {
    expect(site.description).toBe(homeDescription);
  });

  it("publisher.@id aponta para o mesmo Organization", () => {
    expect(site.publisher["@id"]).toBe(organizationSchema()["@id"]);
  });

  it("usa inLanguage pt-PT", () => {
    expect(site.inLanguage).toBe("pt-PT");
  });

  it("não contém potentialAction/SearchAction", () => {
    expect(site).not.toHaveProperty("potentialAction");
    expect(JSON.stringify(site)).not.toContain("SearchAction");
  });

  it("não contém URLs relativas nem localhost em nenhum valor string", () => {
    const values = [site["@id"], site.url, site.publisher["@id"]];
    for (const value of values) {
      expect(isAbsoluteUrl(value)).toBe(true);
      expect(value).not.toContain("localhost");
    }
  });
});

describe("homepageWebPageSchema", () => {
  const page = homepageWebPageSchema();

  it("tem @context e @type corretos", () => {
    expect(page["@context"]).toBe("https://schema.org");
    expect(page["@type"]).toBe("WebPage");
  });

  it("tem @id estável", () => {
    expect(page["@id"]).toBe(`${siteConfig.url}/#webpage`);
  });

  it("tem URL absoluta", () => {
    expect(isAbsoluteUrl(page.url)).toBe(true);
    expect(page.url).not.toContain("localhost");
  });

  it("nome é exatamente a fonte única homeTitle", () => {
    expect(page.name).toBe(homeTitle);
  });

  it("descrição é exatamente a fonte única homeDescription", () => {
    expect(page.description).toBe(homeDescription);
  });

  it("url é exatamente a fonte única homeUrl", () => {
    expect(page.url).toBe(homeUrl);
  });

  it("isPartOf.@id corresponde ao WebSite", () => {
    expect(page.isPartOf["@id"]).toBe(websiteSchema()["@id"]);
  });

  it("about.@id corresponde ao Organization", () => {
    expect(page.about["@id"]).toBe(organizationSchema()["@id"]);
  });

  it("usa inLanguage pt-PT", () => {
    expect(page.inLanguage).toBe("pt-PT");
  });

  it("não contém SearchAction nem BreadcrumbList", () => {
    const serialized = JSON.stringify(page);
    expect(serialized).not.toContain("SearchAction");
    expect(serialized).not.toContain("BreadcrumbList");
    expect(page).not.toHaveProperty("potentialAction");
    expect(page).not.toHaveProperty("breadcrumb");
  });

  it("não contém URLs relativas nem localhost em nenhum valor string", () => {
    const values = [page["@id"], page.url, page.isPartOf["@id"], page.about["@id"]];
    for (const value of values) {
      expect(isAbsoluteUrl(value)).toBe(true);
      expect(value).not.toContain("localhost");
    }
  });
});

describe("faqSchema", () => {
  const items = [
    { question: "Pergunta 1?", answer: "Resposta 1." },
    { question: "Pergunta 2?", answer: "Resposta 2." },
  ];
  const schema = faqSchema(items);

  it("tem @type FAQPage e mapeia todas as perguntas", () => {
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0].name).toBe("Pergunta 1?");
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe("Resposta 1.");
  });
});

describe("servicesSchema", () => {
  const services = [
    { title: "Serviço 1", description: "Descrição 1" },
    { title: "Serviço 2", description: "Descrição 2" },
  ];
  const schema = servicesSchema(services);

  it("tem @type ItemList e mapeia todos os serviços como Service", () => {
    expect(schema["@type"]).toBe("ItemList");
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0]["@type"]).toBe("Service");
    expect(schema.itemListElement[0].position).toBe(1);
  });
});
