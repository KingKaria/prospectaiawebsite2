import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ContactForm } from "@/components/forms/contact-form";

/**
 * O ambiente de testes deste projeto usa `environment: "node"` (sem
 * jsdom/testing-library instalados) — por isso, tal como o resto da
 * suite, estes testes verificam a renderização estática (estado
 * inicial) via renderToStaticMarkup, não interação real (submissão,
 * transições de estado, foco). Essa cobertura fica para a validação
 * manual no browser exigida por esta etapa.
 */

const html = renderToStaticMarkup(<ContactForm />);

describe("ContactForm — renderização inicial", () => {
  it("renderiza sem lançar erro", () => {
    expect(html.length).toBeGreaterThan(0);
  });

  it("tem noValidate no formulário", () => {
    expect(html).toMatch(/<form[^>]*novalidate/i);
  });

  it("renderiza os quatro campos obrigatórios com os labels corretos", () => {
    expect(html).toContain(">Nome<");
    expect(html).toContain(">Email profissional<");
    expect(html).toContain(">Empresa<");
    expect(html).toContain(">Mensagem<");
  });

  it("renderiza os dois campos opcionais, identificados como tal", () => {
    expect(html).toContain("Telefone (opcional)");
    expect(html).toContain("Website (opcional)");
  });

  it("marca os campos obrigatórios com required e os opcionais sem required", () => {
    expect(html).toMatch(/id="contact-name"[^>]*required/);
    expect(html).toMatch(/id="contact-email"[^>]*required/);
    expect(html).toMatch(/id="contact-company"[^>]*required/);
    expect(html).not.toMatch(/id="contact-phone"[^>]*required/);
    expect(html).not.toMatch(/id="contact-website"[^>]*required/);
  });

  it("usa os tipos e autocomplete corretos por campo", () => {
    expect(html).toMatch(/id="contact-email"[^>]*type="email"/);
    expect(html).toMatch(/id="contact-email"[^>]*autoComplete="email"/);
    expect(html).toMatch(/id="contact-name"[^>]*autoComplete="name"/);
    expect(html).toMatch(/id="contact-company"[^>]*autoComplete="organization"/);
    expect(html).toMatch(/id="contact-phone"[^>]*type="tel"/);
    expect(html).toMatch(/id="contact-phone"[^>]*autoComplete="tel"/);
    expect(html).toMatch(/id="contact-website"[^>]*type="url"/);
    expect(html).toMatch(/id="contact-website"[^>]*autoComplete="url"/);
  });

  it("não mostra nenhum erro de campo no estado inicial", () => {
    expect(html).not.toMatch(/aria-invalid="true"/);
  });

  it("tem o botão de submissão com o texto inicial correto", () => {
    expect(html).toContain(">Enviar pedido<");
    expect(html).not.toContain("A enviar…");
  });

  it("não mostra nenhuma mensagem de sucesso ou erro técnico no estado inicial", () => {
    expect(html).not.toContain("enviada com sucesso");
    expect(html).not.toContain("Não foi possível enviar");
  });
});

describe("ContactForm — honeypot", () => {
  it("existe no HTML com o nome neutro 'url'", () => {
    expect(html).toMatch(/name="url"/);
  });

  it("está fora da navegação por teclado", () => {
    expect(html).toMatch(/id="contact-url"[^>]*tabindex="-1"/);
  });

  it("está marcado como aria-hidden para leitores de ecrã", () => {
    const wrapperMatch = html.match(/<div aria-hidden="true"[^>]*>[\s\S]*?<\/div>/);
    expect(wrapperMatch).toBeTruthy();
    expect(wrapperMatch?.[0]).toContain('name="url"');
  });

  it("não usa display:none (permanece tecnicamente visível ao DOM, só deslocado do ecrã)", () => {
    const wrapperMatch = html.match(/<div aria-hidden="true"[^>]*>/);
    expect(wrapperMatch?.[0]).not.toContain("display:none");
    expect(wrapperMatch?.[0]).not.toContain("display: none");
  });
});

describe("ContactForm — formStartedAt", () => {
  it("existe como campo oculto com um valor numérico (epoch ms)", () => {
    const match = html.match(/name="formStartedAt" value="(\d+)"/);
    expect(match).toBeTruthy();
    if (match) {
      const value = Number(match[1]);
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThanOrEqual(Date.now());
    }
  });
});
