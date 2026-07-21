import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactFormState } from "@/lib/validations/contact";

vi.mock("@/lib/email/send-contact-message", () => ({
  sendContactMessage: vi.fn(),
}));

vi.mock("@/lib/rate-limit/check-rate-limit", () => ({
  checkRateLimit: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

const idleState: ContactFormState = { status: "idle" };
const ORIGINAL_ENV = { ...process.env };
const RATE_LIMIT_SECRET = "segredo-de-teste";
const DEFAULT_IP = "203.0.113.10";

function buildFormData(overrides: Record<string, string> = {}) {
  const formData = new FormData();
  const base: Record<string, string> = {
    name: "Maria Silva",
    email: "maria@empresa.pt",
    company: "Empresa Exemplo",
    phone: "",
    website: "",
    message: "Gostaria de saber mais sobre os vossos serviços de prospeção comercial B2B.",
    url: "", // honeypot vazio (estado normal de um humano)
    // Iniciado há 5s: passa o mínimo de 3s, não está no futuro nem
    // demasiado antigo — uma submissão legítima típica.
    formStartedAt: String(Date.now() - 5000),
  };
  for (const [key, value] of Object.entries({ ...base, ...overrides })) {
    formData.set(key, value);
  }
  return formData;
}

async function mockClientIp(ip: string | null) {
  const { headers } = await import("next/headers");
  const headerInit: Record<string, string> = ip ? { "x-forwarded-for": ip } : {};
  vi.mocked(headers).mockResolvedValue(new Headers(headerInit));
}

async function mockRateLimitVerdict(limited: boolean) {
  const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");
  vi.mocked(checkRateLimit).mockResolvedValue({ limited });
}

beforeEach(async () => {
  process.env.CONTACT_RATE_LIMIT_SECRET = RATE_LIMIT_SECRET;
  await mockClientIp(DEFAULT_IP);
  await mockRateLimitVerdict(false);
});

afterEach(() => {
  vi.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
});

describe("submitContactForm — submissão legítima", () => {
  it("devolve success quando o payload é válido e o adaptador confirma sucesso", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    vi.mocked(sendContactMessage).mockResolvedValue({ ok: true });
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData());

    expect(result).toEqual({ status: "success" });
    expect(sendContactMessage).toHaveBeenCalledTimes(1);
  });

  it("passa ao adaptador apenas os campos de conteúdo, nunca honeypot nem formStartedAt", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    vi.mocked(sendContactMessage).mockResolvedValue({ ok: true });
    const { submitContactForm } = await import("@/app/contacto/actions");

    await submitContactForm(idleState, buildFormData());

    const calledWith = vi.mocked(sendContactMessage).mock.calls[0][0];
    expect(calledWith).not.toHaveProperty("honeypot");
    expect(calledWith).not.toHaveProperty("formStartedAt");
    expect(calledWith).not.toHaveProperty("url");
    expect(calledWith).toEqual({
      name: "Maria Silva",
      email: "maria@empresa.pt",
      company: "Empresa Exemplo",
      phone: undefined,
      website: undefined,
      message: "Gostaria de saber mais sobre os vossos serviços de prospeção comercial B2B.",
    });
  });

  it("ignora campos desconhecidos/injetados no FormData (ex. tentativa de definir destinatário)", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    vi.mocked(sendContactMessage).mockResolvedValue({ ok: true });
    const { submitContactForm } = await import("@/app/contacto/actions");

    const formData = buildFormData();
    formData.set("to", "outro@dominio.com");
    formData.set("subject", "Assunto escolhido pelo utilizador");

    const result = await submitContactForm(idleState, formData);

    expect(result.status).toBe("success");
    const calledWith = vi.mocked(sendContactMessage).mock.calls[0][0];
    expect(calledWith).not.toHaveProperty("to");
    expect(calledWith).not.toHaveProperty("subject");
  });
});

describe("submitContactForm — validação", () => {
  it("devolve validation_error com erros por campo quando o payload é inválido", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData({ name: "", email: "inválido" }));

    expect(result.status).toBe("validation_error");
    if (result.status === "validation_error") {
      expect(result.fieldErrors.name).toBeDefined();
      expect(result.fieldErrors.email).toBeDefined();
    }
    expect(sendContactMessage).not.toHaveBeenCalled();
  });
});

describe("submitContactForm — portas honeypot/timing (sucesso aparente, adaptador nunca chamado)", () => {
  it("trata honeypot preenchido como suspeito: devolve success sem chamar o adaptador", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData({ url: "http://spam.example" }));

    expect(result).toEqual({ status: "success" });
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("trata preenchimento demasiado rápido como suspeito: success sem chamar o adaptador", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    const { submitContactForm } = await import("@/app/contacto/actions");

    // Iniciado agora → 0ms decorridos, abaixo do mínimo de 3s.
    const result = await submitContactForm(idleState, buildFormData({ formStartedAt: String(Date.now()) }));

    expect(result).toEqual({ status: "success" });
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("trata formStartedAt ausente como suspeito (sem fallback): success sem chamar o adaptador", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData({ formStartedAt: "" }));

    expect(result).toEqual({ status: "success" });
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("a validação de contacto nunca corre para uma submissão suspeita (honeypot antes da validação)", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    const { submitContactForm } = await import("@/app/contacto/actions");

    // Honeypot preenchido E campos de contacto inválidos: mesmo assim
    // devolve sucesso aparente (não validation_error), porque a porta
    // honeypot corre primeiro.
    const result = await submitContactForm(
      idleState,
      buildFormData({ url: "spam", name: "", email: "inválido" })
    );

    expect(result).toEqual({ status: "success" });
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("não consulta o rate limiting quando o honeypot já apanhou a submissão", async () => {
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");
    const { submitContactForm } = await import("@/app/contacto/actions");

    await submitContactForm(idleState, buildFormData({ url: "spam" }));

    expect(checkRateLimit).not.toHaveBeenCalled();
  });

  it("não consulta o rate limiting quando a janela temporal já apanhou a submissão", async () => {
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");
    const { submitContactForm } = await import("@/app/contacto/actions");

    await submitContactForm(idleState, buildFormData({ formStartedAt: String(Date.now()) }));

    expect(checkRateLimit).not.toHaveBeenCalled();
  });
});

describe("submitContactForm — rate limiting", () => {
  it("devolve rate_limited (estado honesto, não sucesso aparente) quando o limite foi excedido", async () => {
    await mockRateLimitVerdict(true);
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData());

    expect(result.status).toBe("rate_limited");
    if (result.status === "rate_limited") {
      expect(result.message.length).toBeGreaterThan(0);
    }
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("consulta o rate limiting com o identificador pseudónimo (HMAC-SHA-256 do IP), nunca o IP em bruto", async () => {
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");
    const { submitContactForm } = await import("@/app/contacto/actions");

    await submitContactForm(idleState, buildFormData());

    const expectedIdentifier = createHmac("sha256", RATE_LIMIT_SECRET).update(DEFAULT_IP).digest("hex");
    expect(checkRateLimit).toHaveBeenCalledWith(expectedIdentifier);
    expect(checkRateLimit).not.toHaveBeenCalledWith(DEFAULT_IP);
  });

  it("prossegue para a validação e o adaptador quando o rate limiting confirma que está dentro do limite", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    vi.mocked(sendContactMessage).mockResolvedValue({ ok: true });
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData());

    expect(result).toEqual({ status: "success" });
    expect(sendContactMessage).toHaveBeenCalledTimes(1);
  });

  it("fail-open: prossegue sem bloquear quando não há segredo configurado (identificador indisponível)", async () => {
    delete process.env.CONTACT_RATE_LIMIT_SECRET;
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    vi.mocked(sendContactMessage).mockResolvedValue({ ok: true });
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData());

    expect(result).toEqual({ status: "success" });
    expect(checkRateLimit).not.toHaveBeenCalled();
    expect(sendContactMessage).toHaveBeenCalledTimes(1);
  });

  it("fail-open: prossegue sem bloquear quando não há IP identificável nos cabeçalhos", async () => {
    await mockClientIp(null);
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    vi.mocked(sendContactMessage).mockResolvedValue({ ok: true });
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData());

    expect(result).toEqual({ status: "success" });
    expect(checkRateLimit).not.toHaveBeenCalled();
    expect(sendContactMessage).toHaveBeenCalledTimes(1);
  });

  it("nunca regista o IP nos logs", async () => {
    await mockRateLimitVerdict(true);
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { submitContactForm } = await import("@/app/contacto/actions");

    await submitContactForm(idleState, buildFormData());

    const loggedText = warnSpy.mock.calls.flat().map((v) => JSON.stringify(v)).join(" ");
    expect(loggedText).not.toContain(DEFAULT_IP);
    warnSpy.mockRestore();
  });
});

describe("submitContactForm — erros do adaptador", () => {
  it("devolve technical_error, sem detalhes internos, quando o adaptador falha", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    vi.mocked(sendContactMessage).mockResolvedValue({ ok: false, reason: "provider_unavailable" });
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData());

    expect(result.status).toBe("technical_error");
    if (result.status === "technical_error") {
      expect(result.message).not.toContain("provider_unavailable");
      expect(result.message.length).toBeGreaterThan(0);
    }
  });

  it("devolve technical_error, sem propagar a exceção, quando o adaptador rejeita", async () => {
    const { sendContactMessage } = await import("@/lib/email/send-contact-message");
    vi.mocked(sendContactMessage).mockRejectedValue(new Error("stack trace interno sensível"));
    const { submitContactForm } = await import("@/app/contacto/actions");

    const result = await submitContactForm(idleState, buildFormData());

    expect(result.status).toBe("technical_error");
    if (result.status === "technical_error") {
      expect(result.message).not.toContain("stack trace interno sensível");
    }
  });
});
