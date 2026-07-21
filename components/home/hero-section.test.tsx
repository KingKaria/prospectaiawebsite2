import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroSection } from "@/components/home/hero-section";

function visibleText(html: string) {
  // Remove tags e atributos (ex.: offset="0%" do gradiente SVG) para
  // verificar apenas o texto que é realmente lido pelo utilizador.
  return html.replace(/<[^>]*>/g, " ");
}

describe("HeroSection", () => {
  const html = renderToStaticMarkup(<HeroSection />);
  const text = visibleText(html);

  it("renderiza sem lançar erro", () => {
    expect(html.length).toBeGreaterThan(0);
  });

  it("tem exatamente um h1", () => {
    const matches = html.match(/<h1[\s>]/g) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("tem o CTA principal a apontar para /contacto", () => {
    expect(html).toContain('href="/contacto"');
    expect(html).toContain("Pedir diagnóstico comercial");
  });

  it("tem o CTA secundário a apontar para /servicos", () => {
    expect(html).toContain('href="/servicos"');
    expect(html).toContain("Ver serviços");
  });

  it("não contém percentagens, valores monetários nem números de leads/clientes no texto visível", () => {
    expect(text).not.toMatch(/\d+\s*%/);
    expect(text).not.toMatch(/€\s*\d/);
    expect(text).not.toMatch(/\d+\s*(clientes|leads|anos de experiência|prémios?)/i);
  });

  it("não contém palavras associadas a testemunhos ou prova social inventada", () => {
    expect(text.toLowerCase()).not.toMatch(/testemunh|avalia(ç|c)ão de client/);
  });
});
