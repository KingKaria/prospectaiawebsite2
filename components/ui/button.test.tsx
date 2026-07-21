import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "@/components/ui/button";

const BASE_CLASS_SNIPPET = "inline-flex items-center justify-center";
const PRIMARY_CLASS_SNIPPET = "bg-[linear-gradient(90deg,var(--color-cyan),var(--color-violet)_115%)]";
const SECONDARY_CLASS_SNIPPET = "border border-cyan";
const SIZE_LG_SNIPPET = "h-12";
const SIZE_MD_SNIPPET = "h-11";

describe("Button — sem href (renderiza <button>)", () => {
  it("inclui as classes base", () => {
    const html = renderToStaticMarkup(<Button>Texto</Button>);
    expect(html).toContain(BASE_CLASS_SNIPPET);
  });

  it("inclui as classes da variante (primary por omissão)", () => {
    const html = renderToStaticMarkup(<Button>Texto</Button>);
    expect(html).toContain(PRIMARY_CLASS_SNIPPET);
  });

  it("inclui as classes da variante secondary quando pedida", () => {
    const html = renderToStaticMarkup(<Button variant="secondary">Texto</Button>);
    expect(html).toContain(SECONDARY_CLASS_SNIPPET);
    expect(html).not.toContain(PRIMARY_CLASS_SNIPPET);
  });

  it("inclui as classes do tamanho (md por omissão, lg quando pedido)", () => {
    const htmlDefault = renderToStaticMarkup(<Button>Texto</Button>);
    expect(htmlDefault).toContain(SIZE_MD_SNIPPET);

    const htmlLarge = renderToStaticMarkup(<Button size="lg">Texto</Button>);
    expect(htmlLarge).toContain(SIZE_LG_SNIPPET);
  });

  it("combina className adicional com as classes calculadas, sem as apagar", () => {
    const html = renderToStaticMarkup(<Button className="self-start">Texto</Button>);
    expect(html).toContain("self-start");
    expect(html).toContain(BASE_CLASS_SNIPPET);
    expect(html).toContain(PRIMARY_CLASS_SNIPPET);
    expect(html).toContain(SIZE_MD_SNIPPET);
  });

  it("preserva disabled", () => {
    const html = renderToStaticMarkup(<Button disabled>Texto</Button>);
    expect(html).toMatch(/<button[^>]*disabled/);
  });

  it("preserva type (button por omissão, submit quando pedido)", () => {
    const htmlDefault = renderToStaticMarkup(<Button>Texto</Button>);
    expect(htmlDefault).toMatch(/<button[^>]*type="button"/);

    const htmlSubmit = renderToStaticMarkup(<Button type="submit">Texto</Button>);
    expect(htmlSubmit).toMatch(/<button[^>]*type="submit"/);
  });

  it("preserva atributos aria-*", () => {
    const html = renderToStaticMarkup(<Button aria-label="Etiqueta de teste">Texto</Button>);
    expect(html).toContain('aria-label="Etiqueta de teste"');
  });

  it("aceita um handler onClick sem quebrar a renderização", () => {
    const handleClick = () => {};
    const html = renderToStaticMarkup(<Button onClick={handleClick}>Texto</Button>);
    expect(html.length).toBeGreaterThan(0);
  });

  it("não deixa variant/size vazarem como atributos HTML", () => {
    const html = renderToStaticMarkup(<Button variant="secondary" size="lg">Texto</Button>);
    expect(html).not.toMatch(/variant="/);
    expect(html).not.toMatch(/\ssize="/);
  });
});

describe("Button — com href (renderiza link)", () => {
  it("renderiza um elemento <a>", () => {
    const html = renderToStaticMarkup(<Button href="/contacto">Texto</Button>);
    expect(html).toMatch(/<a[\s>]/);
  });

  it("inclui as classes base, variante e tamanho", () => {
    const html = renderToStaticMarkup(
      <Button href="/contacto" size="lg">
        Texto
      </Button>
    );
    expect(html).toContain(BASE_CLASS_SNIPPET);
    expect(html).toContain(PRIMARY_CLASS_SNIPPET);
    expect(html).toContain(SIZE_LG_SNIPPET);
  });

  it("combina className adicional com as classes calculadas, sem as apagar", () => {
    const html = renderToStaticMarkup(
      <Button href="/contacto" className="w-full sm:w-auto">
        Texto
      </Button>
    );
    expect(html).toContain("w-full");
    expect(html).toContain("sm:w-auto");
    expect(html).toContain(BASE_CLASS_SNIPPET);
    expect(html).toContain(PRIMARY_CLASS_SNIPPET);
  });

  it("preserva o href", () => {
    const html = renderToStaticMarkup(<Button href="/contacto">Texto</Button>);
    expect(html).toContain('href="/contacto"');
  });

  it("preserva atributos relevantes (ex. aria-label)", () => {
    const html = renderToStaticMarkup(
      <Button href="/contacto" aria-label="Etiqueta de link">
        Texto
      </Button>
    );
    expect(html).toContain('aria-label="Etiqueta de link"');
  });

  it("não deixa variant/size vazarem como atributos HTML", () => {
    const html = renderToStaticMarkup(
      <Button href="/contacto" variant="secondary" size="lg">
        Texto
      </Button>
    );
    expect(html).not.toMatch(/variant="/);
    expect(html).not.toMatch(/\ssize="/);
  });

  it("aplica target=_blank e rel=noopener noreferrer para href externo", () => {
    const html = renderToStaticMarkup(<Button href="https://exemplo.com">Texto</Button>);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain(BASE_CLASS_SNIPPET);
  });

  it("combina className com as classes calculadas também no ramo externo", () => {
    const html = renderToStaticMarkup(
      <Button href="https://exemplo.com" className="mt-4 w-full">
        Texto
      </Button>
    );
    expect(html).toContain("mt-4");
    expect(html).toContain("w-full");
    expect(html).toContain(BASE_CLASS_SNIPPET);
  });
});

describe("Button — regressão do bug de className", () => {
  it("<Button className=\"self-start\"> mantém simultaneamente self-start, base, variante e tamanho", () => {
    const html = renderToStaticMarkup(<Button className="self-start">Enviar pedido</Button>);
    expect(html).toContain("self-start");
    expect(html).toContain(BASE_CLASS_SNIPPET);
    expect(html).toContain(PRIMARY_CLASS_SNIPPET);
    expect(html).toContain(SIZE_MD_SNIPPET);
  });
});
