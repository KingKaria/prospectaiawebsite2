import { siteConfig } from "@/lib/constants";
import type { ContactMessageInput } from "@/lib/validations/contact";

/**
 * Dados já validados a enviar — apenas os campos de contacto. Os campos
 * técnicos anti-spam (honeypot, formStartedAt) nunca chegam aqui: são
 * tratados por portas dedicadas antes desta camada.
 */
export type SendContactMessageInput = ContactMessageInput;

export type SendContactMessageResult = { ok: true } | { ok: false; reason: string };

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// Assunto controlado exclusivamente pelo servidor — nunca vem do cliente.
// Derivado de siteConfig.name para manter a marca consistente com o resto
// do site (ProspectAIA), em vez de uma string escrita à mão.
const CONTACT_SUBJECT = `Novo pedido de contacto — ${siteConfig.name}`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

/**
 * Constrói o corpo do email em texto simples.
 */
function buildEmailText(input: SendContactMessageInput, receivedAt: string): string {
  const lines = [
    `Nome: ${input.name}`,
    `Empresa: ${input.company}`,
    `Email: ${input.email}`,
  ];
  if (input.phone) lines.push(`Telefone: ${input.phone}`);
  if (input.website) lines.push(`Website: ${input.website}`);
  lines.push("", "Mensagem:", input.message, "", `Recebido em: ${receivedAt} (hora de Lisboa)`);

  return lines.join("\n");
}

/**
 * Constrói o corpo do email em HTML. Todos os campos vindos do utilizador
 * são escapados (escapeHtml/escapeHtmlMultiline) antes de entrarem no
 * markup, para eliminar qualquer risco de injeção de HTML no conteúdo.
 */
function buildEmailHtml(input: SendContactMessageInput, receivedAt: string): string {
  const rows = [
    `<p><strong>Nome:</strong> ${escapeHtml(input.name)}</p>`,
    `<p><strong>Empresa:</strong> ${escapeHtml(input.company)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(input.email)}</p>`,
  ];
  if (input.phone) rows.push(`<p><strong>Telefone:</strong> ${escapeHtml(input.phone)}</p>`);
  if (input.website) rows.push(`<p><strong>Website:</strong> ${escapeHtml(input.website)}</p>`);
  rows.push(`<p><strong>Mensagem:</strong><br>${escapeHtmlMultiline(input.message)}</p>`);
  rows.push(
    `<p style="color:#666;font-size:12px;">Recebido em: ${escapeHtml(receivedAt)} (hora de Lisboa)</p>`
  );

  return rows.join("\n");
}

type BrevoErrorBody = { code?: unknown; message?: unknown };

/**
 * Adaptador de envio da mensagem de contacto via API Transactional Email
 * do Brevo (https://api.brevo.com/v3/smtp/email).
 *
 * Garantias de segurança:
 * - destinatário (to) e remetente (sender) vêm SEMPRE de variáveis de
 *   ambiente do servidor, nunca do payload do cliente;
 * - o assunto é uma constante do servidor;
 * - o único dado do visitante usado em campos de envelope é o email
 *   validado pelo schema, e apenas como replyTo;
 * - a API key vive só no servidor (BREVO_API_KEY, nunca NEXT_PUBLIC_) e
 *   nunca é escrita em logs;
 * - os logs nunca incluem dados pessoais completos, só sinais técnicos.
 *
 * A assinatura mantém-se idêntica à do adaptador anterior, por isso a
 * Server Action e o formulário não precisam de mudar.
 */
export async function sendContactMessage(
  input: SendContactMessageInput
): Promise<SendContactMessageResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.CONTACT_EMAIL_FROM;
  const fromName = process.env.CONTACT_EMAIL_FROM_NAME;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !fromEmail || !fromName || !to) {
    // Configuração em falta é um erro de deployment, não do utilizador —
    // registado como sinal técnico (sem valores), devolve falha genérica.
    console.error("[contact] configuração de email em falta", {
      hasApiKey: Boolean(apiKey),
      hasFromEmail: Boolean(fromEmail),
      hasFromName: Boolean(fromName),
      hasTo: Boolean(to),
    });
    return { ok: false, reason: "missing_config" };
  }

  const receivedAt = new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Lisbon",
  }).format(new Date());

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: to }],
        replyTo: { email: input.email },
        subject: CONTACT_SUBJECT,
        htmlContent: buildEmailHtml(input, receivedAt),
        textContent: buildEmailText(input, receivedAt),
      }),
    });

    if (!response.ok) {
      let reason = `http_${response.status}`;
      try {
        const body: BrevoErrorBody = await response.json();
        if (typeof body.code === "string" && body.code.length > 0) {
          reason = body.code;
        }
      } catch {
        // Corpo de erro não é JSON válido — mantém o código HTTP genérico.
      }
      // body.code é um código técnico do Brevo (ex. "invalid_parameter"),
      // nunca conteúdo do utilizador — seguro registar. body.message nunca
      // é lido/registado, para não arriscar expor detalhe interno.
      console.error("[contact] Brevo devolveu erro", { status: response.status, reason });
      return { ok: false, reason };
    }

    console.log("[contact] mensagem enviada", {
      hasPhone: Boolean(input.phone),
      hasWebsite: Boolean(input.website),
      messageLength: input.message.length,
    });
    return { ok: true };
  } catch (error) {
    console.error(
      "[contact] exceção ao enviar via Brevo",
      error instanceof Error ? error.name : "erro desconhecido"
    );
    return { ok: false, reason: "send_exception" };
  }
}
