"use server";

import { headers } from "next/headers";
import {
  contactMessageSchema,
  toFieldErrors,
  type ContactFormState,
} from "@/lib/validations/contact";
import { checkHoneypot, checkTiming } from "@/lib/validations/contact-guards";
import { deriveRateLimitIdentifier, extractClientIp } from "@/lib/rate-limit/derive-identifier";
import { checkRateLimit } from "@/lib/rate-limit/check-rate-limit";
import { sendContactMessage } from "@/lib/email/send-contact-message";

const GENERIC_ERROR_MESSAGE =
  "Não foi possível enviar a mensagem neste momento. Pode tentar novamente ou contactar-nos por email, telefone ou WhatsApp.";

const RATE_LIMIT_MESSAGE =
  "Recebemos vários pedidos seguidos a partir deste dispositivo. Aguarde alguns minutos e tente novamente.";

// Sucesso aparente: a resposta pública para submissões suspeitas de
// honeypot/timing tem exatamente a mesma forma do sucesso legítimo, para
// não revelar a um bot que foi detetado. O rate limiting é diferente: trata
// de abuso por repetição, não de deteção de bot, por isso devolve um estado
// "rate_limited" honesto em vez de sucesso aparente.
const APPARENT_SUCCESS: ContactFormState = { status: "success" };

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * Server Action do formulário de contacto.
 *
 * Ordem das portas (uma submissão suspeita nunca passa da porta que a
 * apanha, por isso nunca chega ao schema de contacto, ao adaptador, ao
 * Brevo, nem a qualquer log com dados pessoais):
 *
 *   1. extrair apenas os campos autorizados;
 *   2. honeypot            → sucesso aparente se suspeito;
 *   3. janela temporal     → sucesso aparente se suspeito;
 *   4. resolver identificador técnico (pseudónimo, derivado do IP);
 *   5. rate limiting       → "rate_limited" se excedido (fail-open se o
 *      identificador ou o Upstash não estiverem disponíveis);
 *   6. validar os campos de contacto;
 *   7. chamar o adaptador de email (Brevo);
 *   8. devolver o resultado.
 *
 * O rate limiting corre depois do honeypot e da janela temporal, de
 * propósito: bots óbvios e submissões demasiado rápidas são filtrados sem
 * gastar uma chamada ao Upstash.
 *
 * Destinatário, remetente e assunto continuam totalmente controlados
 * pelo servidor (no adaptador) — nada disso vem do cliente.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 2. Honeypot.
  const honeypot = checkHoneypot(formData);
  if (honeypot.suspicious) {
    // Log mínimo e sem dados pessoais — só o motivo técnico.
    console.warn("[contact] submissão ignorada", { gate: "honeypot", reason: honeypot.reason });
    return APPARENT_SUCCESS;
  }

  // 3. Janela temporal.
  const timing = checkTiming(formData);
  if (timing.suspicious) {
    console.warn("[contact] submissão ignorada", { gate: "timing", reason: timing.reason });
    return APPARENT_SUCCESS;
  }

  // 4. Identificador técnico: nunca o IP em bruto, só o seu HMAC-SHA-256.
  const headerList = await headers();
  const ip = extractClientIp(headerList);
  const identifierResult = deriveRateLimitIdentifier(ip, process.env.CONTACT_RATE_LIMIT_SECRET);

  // 5. Rate limiting — fail-open: sem identificador disponível ou com o
  // Upstash em baixo, a proteção fica degradada mas nunca bloqueia uma
  // mensagem legítima por isso.
  if (identifierResult.available) {
    const rateLimit = await checkRateLimit(identifierResult.identifier);
    if (rateLimit.limited) {
      console.warn("[contact] submissão bloqueada", { gate: "rate_limit" });
      return { status: "rate_limited", message: RATE_LIMIT_MESSAGE };
    }
  } else {
    console.warn("[contact] rate limiting degradado", { reason: identifierResult.reason });
  }

  // 6. Validação dos campos de contacto. Só os 6 campos autorizados são
  // lidos para o candidate — nenhum campo extra (destinatário, assunto,
  // remetente) pode entrar, independentemente do que o FormData contenha.
  const candidate = {
    name: readString(formData, "name"),
    email: readString(formData, "email"),
    company: readString(formData, "company"),
    phone: readString(formData, "phone"),
    website: readString(formData, "website"),
    message: readString(formData, "message"),
  };

  const parsed = contactMessageSchema.safeParse(candidate);

  if (!parsed.success) {
    return { status: "validation_error", fieldErrors: toFieldErrors(parsed.error) };
  }

  // 7. Adaptador.
  try {
    const result = await sendContactMessage(parsed.data);

    if (!result.ok) {
      console.error("[contact] adaptador de envio devolveu falha", { reason: result.reason });
      return { status: "technical_error", message: GENERIC_ERROR_MESSAGE };
    }

    return { status: "success" };
  } catch (error) {
    console.error(
      "[contact] erro inesperado ao processar o pedido",
      error instanceof Error ? error.message : "erro desconhecido"
    );
    return { status: "technical_error", message: GENERIC_ERROR_MESSAGE };
  }
}
