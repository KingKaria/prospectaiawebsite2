import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/lib/constants";
import { sendContactMessage, type SendContactMessageInput } from "@/lib/email/send-contact-message";

// Mock hasteado do SDK do Resend — nenhum teste toca na rede. `sendMock`
// é a função que substitui `resend.emails.send`; `ResendMock` é o
// construtor, para podermos verificar que é instanciado com a API key.
const { sendMock, ResendMock } = vi.hoisted(() => {
  const sendMock = vi.fn();
  // Implementação com `function` (não arrow) para poder ser usada como
  // construtor via `new Resend(...)` no vitest 4 — uma arrow function
  // lançaria TypeError ao ser instanciada.
  const ResendMock = vi.fn(function (this: { emails: { send: typeof sendMock } }) {
    this.emails = { send: sendMock };
  });
  return { sendMock, ResendMock };
});

vi.mock("resend", () => ({ Resend: ResendMock }));

const API_KEY = "re_test_key_not_real";
const FROM = "ProspectAIA <contacto@mail.prospectaia.pt>";
const TO = "contacto@prospectaia.pt";

const validInput: SendContactMessageInput = {
  name: "Maria Silva",
  email: "maria@empresa.pt",
  company: "Empresa Exemplo",
  phone: undefined,
  website: undefined,
  message: "Gostaria de saber mais sobre os vossos serviços de prospeção comercial B2B.",
};

beforeEach(() => {
  sendMock.mockReset();
  ResendMock.mockClear();
  process.env.RESEND_API_KEY = API_KEY;
  process.env.CONTACT_EMAIL_FROM = FROM;
  process.env.CONTACT_EMAIL_TO = TO;
});

afterEach(() => {
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_EMAIL_FROM;
  delete process.env.CONTACT_EMAIL_TO;
  vi.restoreAllMocks();
});

describe("sendContactMessage — contrato de tipos", () => {
  it("recebe apenas dados já validados (sem honeypot nem formStartedAt no tipo)", () => {
    // @ts-expect-error honeypot não faz parte de SendContactMessageInput
    const withHoneypot: SendContactMessageInput = { ...validInput, honeypot: "x" };
    void withHoneypot;
  });
});

describe("sendContactMessage — sucesso", () => {
  it("devolve { ok: true } quando o Resend confirma o envio", async () => {
    sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });
    const result = await sendContactMessage(validInput);
    expect(result).toEqual({ ok: true });
  });

  it("instancia o Resend com a API key do ambiente", async () => {
    sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });
    await sendContactMessage(validInput);
    expect(ResendMock).toHaveBeenCalledWith(API_KEY);
  });

  it("inclui os campos opcionais no corpo apenas quando preenchidos", async () => {
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    await sendContactMessage({ ...validInput, phone: "+351 912 345 678", website: "https://empresa.pt" });
    const payload = sendMock.mock.calls[0][0];
    expect(payload.text).toContain("Telefone: +351 912 345 678");
    expect(payload.text).toContain("Website: https://empresa.pt");
  });

  it("omite as linhas de telefone/website quando ausentes", async () => {
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    await sendContactMessage(validInput);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.text).not.toContain("Telefone:");
    expect(payload.text).not.toContain("Website:");
  });
});

describe("sendContactMessage — segurança dos campos de envelope", () => {
  it("usa sempre o to e o from do ambiente, controlados pelo servidor", async () => {
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    await sendContactMessage(validInput);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.from).toBe(FROM);
    expect(payload.to).toBe(TO);
  });

  it("usa o email validado do visitante apenas como reply-to", async () => {
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    await sendContactMessage(validInput);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.replyTo).toBe(validInput.email);
    // O email do visitante nunca é usado como remetente.
    expect(payload.from).not.toBe(validInput.email);
  });

  it("usa um assunto fixo controlado pelo servidor, baseado na marca", async () => {
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    await sendContactMessage(validInput);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.subject).toBe(`Novo pedido de contacto — ${siteConfig.name}`);
  });

  it("não define headers nem tags a partir da entrada", async () => {
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    await sendContactMessage(validInput);
    const payload = sendMock.mock.calls[0][0];
    expect(payload.headers).toBeUndefined();
    expect(payload.tags).toBeUndefined();
  });
});

describe("sendContactMessage — erros", () => {
  it("devolve falha com o código de erro do Resend, sem a mensagem interna", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "rate_limit_exceeded", message: "detalhe interno sensível", statusCode: 429 },
    });
    const result = await sendContactMessage(validInput);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("rate_limit_exceeded");
      expect(result.reason).not.toContain("detalhe interno sensível");
    }
  });

  it("devolve send_exception quando a chamada ao Resend rejeita, sem propagar a exceção", async () => {
    sendMock.mockRejectedValue(new Error("stack trace interno sensível"));
    const result = await sendContactMessage(validInput);
    expect(result).toEqual({ ok: false, reason: "send_exception" });
  });
});

describe("sendContactMessage — trim seguro da configuração", () => {
  it("string undefined em qualquer variável → missing_config, sem chamar o Resend", async () => {
    delete process.env.RESEND_API_KEY;
    expect(await sendContactMessage(validInput)).toEqual({ ok: false, reason: "missing_config" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("string vazia em qualquer variável → missing_config, sem chamar o Resend", async () => {
    process.env.CONTACT_EMAIL_FROM = "";
    expect(await sendContactMessage(validInput)).toEqual({ ok: false, reason: "missing_config" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("string só com espaços em qualquer variável → missing_config, sem chamar o Resend", async () => {
    process.env.CONTACT_EMAIL_TO = "   ";
    expect(await sendContactMessage(validInput)).toEqual({ ok: false, reason: "missing_config" });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("string com espaços à volta de um valor válido não bloqueia — é aparada antes de usar", async () => {
    process.env.CONTACT_EMAIL_TO = `  ${TO}  `;
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });

    const result = await sendContactMessage(validInput);

    expect(result).toEqual({ ok: true });
    expect(sendMock.mock.calls[0][0].to).toBe(TO);
  });

  it("as três variáveis válidas e sem espaços → chama resend.emails.send", async () => {
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    await sendContactMessage(validInput);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });
});

describe("sendContactMessage — logging sem PII", () => {
  it("não escreve nome, email nem mensagem nos logs de sucesso", async () => {
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await sendContactMessage(validInput);
    const loggedText = JSON.stringify(logSpy.mock.calls.flat());
    expect(loggedText).not.toContain(validInput.name);
    expect(loggedText).not.toContain(validInput.email);
    expect(loggedText).not.toContain(validInput.message);
  });

  it("não escreve dados pessoais no log de erro do Resend", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "validation_error", message: "x", statusCode: 400 },
    });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await sendContactMessage(validInput);
    const loggedText = JSON.stringify(errorSpy.mock.calls.flat());
    expect(loggedText).not.toContain(validInput.name);
    expect(loggedText).not.toContain(validInput.email);
    expect(loggedText).not.toContain(validInput.message);
  });

  it("nunca inclui a API key em nenhum log — sucesso, erro ou exceção", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    await sendContactMessage(validInput);

    sendMock.mockResolvedValue({ data: null, error: { name: "validation_error", message: "x" } });
    await sendContactMessage(validInput);

    sendMock.mockRejectedValue(new Error("stack trace interno"));
    await sendContactMessage(validInput);

    const loggedText = JSON.stringify([...logSpy.mock.calls.flat(), ...errorSpy.mock.calls.flat()]);
    expect(loggedText).not.toContain(API_KEY);
  });
});
