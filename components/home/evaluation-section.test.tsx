import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { EvaluationSection } from "@/components/home/evaluation-section";

function visibleText(html: string) {
  return html.replace(/<[^>]*>/g, " ");
}

describe("EvaluationSection", () => {
  const html = renderToStaticMarkup(<EvaluationSection />);
  const text = visibleText(html);

  it("renderiza sem lançar erro", () => {
    expect(html.length).toBeGreaterThan(0);
  });

  it("tem exatamente um h2 com o título esperado", () => {
    const matches = html.match(/<h2[\s>]/g) ?? [];
    expect(matches).toHaveLength(1);
    expect(text).toContain("Como avaliamos uma oportunidade comercial");
  });

  it("tem 5 h3, um por camada, em ordem semântica após o h2", () => {
    const h3Matches = html.match(/<h3[\s>]/g) ?? [];
    expect(h3Matches).toHaveLength(5);
    const h2Index = html.indexOf("<h2");
    const firstH3Index = html.indexOf("<h3");
    expect(firstH3Index).toBeGreaterThan(h2Index);
  });

  it("apresenta as cinco camadas do modelo de análise", () => {
    expect(text).toContain("Dados observados");
    expect(text).toContain("Sinais identificados");
    expect(text).toContain("Inferências explicadas");
    expect(text).toContain("Prioridade sugerida");
    expect(text).toContain("Decisão humana");
  });

  it("refere explicitamente que a decisão final pertence à equipa comercial", () => {
    expect(text).toMatch(/decisão.*(sempre|continua).*equipa comercial/i);
  });

  it("apresenta os critérios aprovados no documento v2", () => {
    expect(text).toContain("Presença digital");
    expect(text).toContain("Sinais de atividade");
    expect(text).toContain("Posicionamento");
    expect(text).toContain("Maturidade comercial");
    expect(text).toContain("Prioridade comercial");
  });

  it("tem o CTA a apontar para /servicos", () => {
    expect(html).toContain('href="/servicos"');
    expect(text).toContain("Ver como aplicamos isto nos serviços");
  });

  it("não contém testemunhos, clientes, logótipos ou casos de sucesso inventados", () => {
    expect(text.toLowerCase()).not.toMatch(/testemunh|clientes dizem|caso de sucesso|confiam em nós/);
  });

  it("não contém percentagens, valores monetários nem números fabricados", () => {
    expect(text).not.toMatch(/\d+\s*%/);
    expect(text).not.toMatch(/€\s*\d/);
    expect(text).not.toMatch(/\d+\s*(clientes|leads|anos de experiência|prémios?)/i);
  });

  it("não promete resultados garantidos, crescimento ou precisão absoluta", () => {
    expect(text.toLowerCase()).not.toMatch(
      /resultados? garantidos?|crescimento garantido|precisão absoluta|leads garantidas?|decisões perfeitas/
    );
  });

  it("distingue explicitamente dados observados de inferências (não são apresentados como factos)", () => {
    expect(text).toContain("nunca como facto");
  });
});
