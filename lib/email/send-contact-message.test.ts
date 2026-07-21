import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/lib/constants";
import { sendContactMessage, type SendContactMessageInput } from "@/lib/email/send-contact-message";

const API_KEY = "brevo_test_key_not_real";
const FROM_EMAIL = "contacto@mail.prospectaia.pt";
const FROM_NAME = "ProspectAIA";
const TO = "contacto@prospectaia.pt";

const validInput: SendContactMessageInput = {
  name: "Maria Silva",
  email: "maria@empresa.pt",
  company: "Empresa Exemplo",
  phone: undefined,
  website: undefined,
  message: "Gostaria de saber mais sobre os vossos serviços de prospeção comercial B2B.",
};

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  process.env.BREVO_API_KEY = API_KEY;
  process.env.CONTACT_EMAIL_FROM = FROM_EMAIL;
  process.env.CONTACT_EMAIL_FROM_NAME = FROM_NAME;
  process.env.CONTACT_EMAIL_TO = TO;
});

afterEach(() => {
  delete process.env.BREVO_API_KEY;
  delete process.env.CONTACT_EMAIL_FROM;
  delete process.env.CONTACT_EMAIL_FROM_NAME;
  delete process.env.CONTACT_EMAIL_TO;
  vi.unstubAllGlobals();
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
  it("devolve { ok: true } quando o Brevo confirma o envio (201)", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "brevo-id" }));
    const result = await sendContactMessage(validInput);
    expect(result).toEqual({ ok: true });
  });

  it("chama o endpoint correto da API Transactional do Brevo", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "brevo-id" }));
    await sendContactMessage(validInput);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.brevo.com/v3/smtp/email",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("envia os headers exigidos, incluindo a api-key do ambiente", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "brevo-id" }));
    await sendContactMessage(validInput);
    const [, requestInit] = fetchMock.mock.calls[0];
    expect(requestInit.headers).toEqual({
      "api-key": API_KEY,
      "content-type": "application/json",
      accept: "application/json",
    });
  });

  it("inclui os campos opcionais no corpo (texto e HTML) apenas quando preenchidos", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "x" }));
    await sendContactMessage({ ...validInput, phone: "+351 912 345 678", website: "https://empresa.pt" });
    const [, requestInit] = fetchMock.mock.calls[0];
    const payload = JSON.parse(requestInit.body);
    expect(payload.textContent).toContain("Telefone: +351 912 345 678");
    expect(payload.textContent).toContain("Website: https://empresa.pt");
    expect(payload.htmlContent).toContain("+351 912 345 678");
    expect(payload.htmlContent).toContain("https://empresa.pt");
  });

  it("omite as linhas de telefone/website quando ausentes", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "x" }));
    await sendContactMessage(validInput);
    const [, requestInit] = fetchMock.mock.calls[0];
    const payload = JSON.parse(requestInit.body);
    expect(payload.textContent).not.toContain("Telefone:");
    expect(payload.textContent).not.toContain("Website:");
    expect(payload.htmlContent).not.toContain("Telefone:");
    expect(payload.htmlContent).not.toContain("Website:");
  });

  it("escapa HTML no conteúdo do utilizador, para não permitir injeção de markup", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "x" }));
    await sendContactMessage({
      ...validInput,
      name: "<script>alert(1)</script>",
      message: "linha um\nlinha <b>dois</b>",
    });
    const [, requestInit] = fetchMock.mock.calls[0];
    const payload = JSON.parse(requestInit.body);
    expect(payload.htmlContent).not.toContain("<script>");
    expect(payload.htmlContent).toContain("&lt;script&gt;");
    expect(payload.htmlContent).toContain("linha um<br>linha &lt;b&gt;dois&lt;/b&gt;");
    // O texto simples não escapa nada — é enviado tal e qual.
    expect(payload.textContent).toContain("<script>alert(1)</script>");
  });
});

describe("sendContactMessage — segurança dos campos de envelope", () => {
  it("usa sempre o sender e o to do ambiente, controlados pelo servidor", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "x" }));
    await sendContactMessage(validInput);
    const [, requestInit] = fetchMock.mock.calls[0];
    const payload = JSON.parse(requestInit.body);
    expect(payload.sender).toEqual({ name: FROM_NAME, email: FROM_EMAIL });
    expect(payload.to).toEqual([{ email: TO }]);
  });

  it("usa o email validado do visitante apenas como replyTo", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "x" }));
    await sendContactMessage(validInput);
    const [, requestInit] = fetchMock.mock.calls[0];
    const payload = JSON.parse(requestInit.body);
    expect(payload.replyTo).toEqual({ email: validInput.email });
    // O email do visitante nunca é usado como remetente.
    expect(payload.sender.email).not.toBe(validInput.email);
  });

  it("usa um assunto fixo controlado pelo servidor, baseado na marca", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "x" }));
    await sendContactMessage(validInput);
    const [, requestInit] = fetchMock.mock.calls[0];
    const payload = JSON.parse(requestInit.body);
    expect(payload.subject).toBe(`Novo pedido de contacto — ${siteConfig.name}`);
  });
});

describe("sendContactMessage — erros", () => {
  it("devolve falha com o código de erro do Brevo, sem a mensagem interna", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse(400, { code: "invalid_parameter", message: "detalhe interno sensível" })
    );
    const result = await sendContactMessage(validInput);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("invalid_parameter");
      expect(result.reason).not.toContain("detalhe interno sensível");
    }
  });

  it("devolve um código genérico baseado no status HTTP quando o corpo de erro não é JSON válido", async () => {
    fetchMock.mockResolvedValue(
      new Response("<html>gateway error</html>", { status: 502, headers: { "content-type": "text/html" } })
    );
    const result = await sendContactMessage(validInput);
    expect(result).toEqual({ ok: false, reason: "http_502" });
  });

  it("devolve send_exception quando a chamada ao Brevo rejeita, sem propagar a exceção", async () => {
    fetchMock.mockRejectedValue(new Error("stack trace interno"));
    const result = await sendContactMessage(validInput);
    expect(result).toEqual({ ok: false, reason: "send_exception" });
  });

  it("devolve missing_config e não chama o Brevo quando falta a API key", async () => {
    delete process.env.BREVO_API_KEY;
    const result = await sendContactMessage(validInput);
    expect(result).toEqual({ ok: false, reason: "missing_config" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("devolve missing_config quando falta o remetente (email ou nome) ou o destinatário", async () => {
    delete process.env.CONTACT_EMAIL_FROM;
    const resultNoFromEmail = await sendContactMessage(validInput);
    expect(resultNoFromEmail).toEqual({ ok: false, reason: "missing_config" });

    process.env.CONTACT_EMAIL_FROM = FROM_EMAIL;
    delete process.env.CONTACT_EMAIL_FROM_NAME;
    const resultNoFromName = await sendContactMessage(validInput);
    expect(resultNoFromName).toEqual({ ok: false, reason: "missing_config" });

    process.env.CONTACT_EMAIL_FROM_NAME = FROM_NAME;
    delete process.env.CONTACT_EMAIL_TO;
    const resultNoTo = await sendContactMessage(validInput);
    expect(resultNoTo).toEqual({ ok: false, reason: "missing_config" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("sendContactMessage — logging sem PII", () => {
  it("não escreve nome, email nem mensagem nos logs de sucesso", async () => {
    fetchMock.mockResolvedValue(jsonResponse(201, { messageId: "x" }));
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    await sendContactMessage(validInput);
    const loggedText = JSON.stringify(logSpy.mock.calls.flat());
    expect(loggedText).not.toContain(validInput.name);
    expect(loggedText).not.toContain(validInput.email);
    expect(loggedText).not.toContain(validInput.message);
  });

  it("não escreve dados pessoais nem a API key no log de erro do Brevo", async () => {
    fetchMock.mockResolvedValue(jsonResponse(400, { code: "validation_error", message: "x" }));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await sendContactMessage(validInput);
    const loggedText = JSON.stringify(errorSpy.mock.calls.flat());
    expect(loggedText).not.toContain(validInput.name);
    expect(loggedText).not.toContain(validInput.email);
    expect(loggedText).not.toContain(validInput.message);
    expect(loggedText).not.toContain(API_KEY);
  });

  it("nunca inclui a API key em nenhum log, mesmo em caso de exceção", async () => {
    fetchMock.mockRejectedValue(new Error("stack trace interno"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await sendContactMessage(validInput);
    const loggedText = JSON.stringify(errorSpy.mock.calls.flat());
    expect(loggedText).not.toContain(API_KEY);
  });
});
