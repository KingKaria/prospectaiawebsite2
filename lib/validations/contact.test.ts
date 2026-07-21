import { describe, expect, it } from "vitest";
import { contactMessageSchema, toFieldErrors } from "@/lib/validations/contact";

const validBase = {
  name: "Maria Silva",
  email: "maria@empresa.pt",
  company: "Empresa Exemplo",
  message: "Gostaria de saber mais sobre os vossos serviços de prospeção comercial B2B.",
};

describe("contactMessageSchema — payloads válidos", () => {
  it("aceita um payload válido completo, com campos opcionais", () => {
    const result = contactMessageSchema.safeParse({
      ...validBase,
      phone: "+351 912 345 678",
      website: "https://empresa.pt",
    });
    expect(result.success).toBe(true);
  });

  it("aceita um payload válido sem os campos opcionais", () => {
    const result = contactMessageSchema.safeParse({ ...validBase, phone: "", website: "" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBeUndefined();
      expect(result.data.website).toBeUndefined();
    }
  });
});

describe("contactMessageSchema — normalização", () => {
  it("remove espaços nas extremidades e colapsa espaços internos no nome", () => {
    const result = contactMessageSchema.safeParse({ ...validBase, name: "  Maria    Silva  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Maria Silva");
  });

  it("colapsa espaços internos na empresa", () => {
    const result = contactMessageSchema.safeParse({ ...validBase, company: "Empresa   Exemplo   Lda" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.company).toBe("Empresa Exemplo Lda");
  });

  it("normaliza o domínio do email para minúsculas, preserva a parte local", () => {
    const result = contactMessageSchema.safeParse({ ...validBase, email: "Maria.Silva@EMPRESA.PT" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("Maria.Silva@empresa.pt");
  });

  it("preserva quebras de linha na mensagem, só apara as extremidades", () => {
    const message = "  Primeira linha.\nSegunda linha.\n\nTerceira linha.  ";
    const result = contactMessageSchema.safeParse({ ...validBase, message });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.message).toBe("Primeira linha.\nSegunda linha.\n\nTerceira linha.");
    }
  });

  it("normaliza website sem protocolo para https", () => {
    const result = contactMessageSchema.safeParse({ ...validBase, website: "empresa.pt" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.website).toBe("https://empresa.pt");
  });

  it("normaliza telefone vazio e website vazio para ausência de valor", () => {
    const result = contactMessageSchema.safeParse({ ...validBase, phone: "   ", website: "   " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBeUndefined();
      expect(result.data.website).toBeUndefined();
    }
  });
});

describe("contactMessageSchema — campos obrigatórios em falta ou vazios", () => {
  it("rejeita nome vazio", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, name: "" }).success).toBe(false);
  });

  it("rejeita nome composto apenas por espaços", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, name: "    " }).success).toBe(false);
  });

  it("rejeita empresa ausente", () => {
    const withoutCompany: Record<string, unknown> = { ...validBase };
    delete withoutCompany.company;
    expect(contactMessageSchema.safeParse(withoutCompany).success).toBe(false);
  });

  it("rejeita empresa vazia", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, company: "" }).success).toBe(false);
  });

  it("rejeita mensagem composta apenas por espaços", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, message: "        " }).success).toBe(false);
  });
});

describe("contactMessageSchema — limites de comprimento", () => {
  it("rejeita nome demasiado curto (1 caractere)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, name: "A" }).success).toBe(false);
  });

  it("rejeita nome demasiado longo (81 caracteres)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, name: "A".repeat(81) }).success).toBe(false);
  });

  it("aceita nome no limite máximo (80 caracteres)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, name: "A".repeat(80) }).success).toBe(true);
  });

  it("rejeita mensagem demasiado curta (19 caracteres)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, message: "A".repeat(19) }).success).toBe(false);
  });

  it("aceita mensagem no limite mínimo (20 caracteres)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, message: "A".repeat(20) }).success).toBe(true);
  });

  it("rejeita mensagem demasiado longa (3001 caracteres)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, message: "A".repeat(3001) }).success).toBe(false);
  });

  it("aceita mensagem no limite máximo (3000 caracteres)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, message: "A".repeat(3000) }).success).toBe(true);
  });
});

describe("contactMessageSchema — email", () => {
  it("rejeita email inválido", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, email: "não-é-um-email" }).success).toBe(false);
  });

  it("não bloqueia emails de fornecedores gratuitos", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, email: "maria@gmail.com" }).success).toBe(true);
  });
});

describe("contactMessageSchema — telefone", () => {
  it("aceita telefone opcional vazio", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, phone: "" }).success).toBe(true);
  });

  it("aceita formato internacional não português", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, phone: "+1 415 555 0100" }).success).toBe(true);
  });

  it("rejeita telefone demasiado longo (31 caracteres)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, phone: "1".repeat(31) }).success).toBe(false);
  });
});

describe("contactMessageSchema — website", () => {
  it("aceita domínio sem protocolo e normaliza para https", () => {
    const result = contactMessageSchema.safeParse({ ...validBase, website: "www.empresa.pt" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.website).toBe("https://www.empresa.pt");
  });

  it("aceita protocolo https explícito", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, website: "https://empresa.pt" }).success).toBe(true);
  });

  it("rejeita protocolo proibido (javascript:)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, website: "javascript:alert(1)" }).success).toBe(false);
  });

  it("rejeita protocolo proibido (ftp:)", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, website: "ftp://empresa.pt" }).success).toBe(false);
  });
});

describe("contactMessageSchema — Unicode", () => {
  it("aceita acentuação e caracteres não latinos no nome e na mensagem", () => {
    const result = contactMessageSchema.safeParse({
      ...validBase,
      name: "José António 田中",
      message: "Mensagem com acentuação — café, ação, coração — e emoji 🎉 incluído para teste.",
    });
    expect(result.success).toBe(true);
  });
});

describe("contactMessageSchema — tipos inesperados e payload adulterado", () => {
  it("rejeita nome como número em vez de string", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, name: 12345 }).success).toBe(false);
  });

  it("rejeita mensagem como array em vez de string", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, message: ["a", "b"] }).success).toBe(false);
  });

  it("rejeita email como objeto em vez de string", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, email: { value: "a@b.com" } }).success).toBe(false);
  });

  it("rejeita campos desconhecidos no payload (ex. assunto)", () => {
    expect(
      contactMessageSchema.safeParse({ ...validBase, subject: "Assunto escolhido pelo utilizador" }).success
    ).toBe(false);
  });

  it("rejeita tentativa de injetar um destinatário no payload", () => {
    expect(contactMessageSchema.safeParse({ ...validBase, to: "outro@dominio.com" }).success).toBe(false);
  });
});

describe("toFieldErrors", () => {
  it("mapeia um erro por campo visível, mantendo apenas a primeira mensagem", () => {
    const result = contactMessageSchema.safeParse({ ...validBase, name: "", email: "inválido" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = toFieldErrors(result.error);
      expect(fieldErrors.name).toBe("Indique o seu nome.");
      expect(fieldErrors.email).toBe("Introduza um endereço de email válido.");
    }
  });

  it("nunca inclui chaves desconhecidas/injetadas no mapa de erros visíveis", () => {
    const result = contactMessageSchema.safeParse({ ...validBase, name: "", subject: "x", to: "y@z.pt" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = toFieldErrors(result.error);
      expect(fieldErrors).not.toHaveProperty("subject");
      expect(fieldErrors).not.toHaveProperty("to");
    }
  });
});
