import { Resend } from "resend";
import { siteConfig } from "@/lib/constants";
import type { ContactMessageInput } from "@/lib/validations/contact";

/**
 * Dados já validados a enviar — apenas os campos de contacto. Os campos
 * técnicos anti-spam (honeypot, formStartedAt) nunca chegam aqui: são
 * tratados por portas dedicadas antes desta camada.
 */
export type SendContactMessageInput = ContactMessageInput;

export type SendContactMessageResult = { ok: true } | { ok: false; reason: string };

// Assunto controlado exclusivamente pelo servidor — nunca vem do cliente.
// Derivado de siteConfig.name para manter a marca consistente com o resto
// do site (ProspectAIA), em vez de uma string escrita à mão.
const CONTACT_SUBJECT = `Novo pedido de contacto — ${siteConfig.name}`;

/**
 * Constrói o corpo do email em texto simples. Texto (não HTML) elimina
 * por construção qualquer risco de injeção de HTML/XSS no conteúdo do
 * utilizador. Campos opcionais só aparecem quando preenchidos. O IP
 * nunca é incluído — é dado pessoal sem utilidade para responder ao
 * pedido (minimização, RGPD art. 5.º/1/c).
 */
function buildEmailText(input: SendContactMessageInput): string {
  const receivedAt = new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Lisbon",
  }).format(new Date());

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
 * Adaptador de envio da mensagem de contacto, agora com Resend real.
 *
 * Garantias de segurança:
 * - destinatário (to) e remetente (from) vêm SEMPRE de variáveis de
 *   ambiente do servidor, nunca do payload do cliente;
 * - o assunto é uma constante do servidor;
 * - o único dado do visitante usado em campos de envelope é o email
 *   validado pelo schema, e apenas como reply-to;
 * - a API key vive só no servidor (RESEND_API_KEY, nunca NEXT_PUBLIC_);
 * - os logs nunca incluem dados pessoais completos, só sinais técnicos.
 *
 * A assinatura mantém-se idêntica à da simulação anterior, por isso a
 * Server Action e o formulário não precisam de mudar.
 */
export async function sendContactMessage(
  input: SendContactMessageInput
): Promise<SendContactMessageResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !from || !to) {
    // Configuração em falta é um erro de deployment, não do utilizador —
    // registado como sinal técnico (sem valores), devolve falha genérica.
    console.error("[contact] configuração de email em falta", {
      hasApiKey: Boolean(apiKey),
      hasFrom: Boolean(from),
      hasTo: Boolean(to),
    });
    return { ok: false, reason: "missing_config" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject: CONTACT_SUBJECT,
      text: buildEmailText(input),
    });

    if (error) {
      // error.name é um código técnico do Resend (ex. "validation_error"),
      // nunca conteúdo do utilizador — seguro registar.
      console.error("[contact] Resend devolveu erro", { name: error.name });
      return { ok: false, reason: error.name };
    }

    console.log("[contact] mensagem enviada", {
      hasPhone: Boolean(input.phone),
      hasWebsite: Boolean(input.website),
      messageLength: input.message.length,
    });
    return { ok: true };
  } catch (error) {
    console.error(
      "[contact] exceção ao enviar via Resend",
      error instanceof Error ? error.name : "erro desconhecido"
    );
    return { ok: false, reason: "send_exception" };
  }
}
