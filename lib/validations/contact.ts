import { z } from "zod";

/**
 * Schema de validação dos campos de contacto (os 6 campos que o
 * utilizador preenche). Os campos técnicos anti-spam — honeypot e
 * formStartedAt — NÃO fazem parte deste schema: são tratados por portas
 * dedicadas antes da validação de contacto (ver lib/validations/
 * contact-guards.ts e app/contacto/actions.ts), para que uma submissão
 * suspeita nunca chegue sequer a esta validação, ao adaptador ou aos
 * logs com dados pessoais.
 */

function collapseSpaces(value: string) {
  // Remove espaços nas extremidades e reduz sequências de espaços
  // internos a um único espaço — aplicado a campos de uma linha
  // (nome, empresa), nunca à mensagem, para preservar quebras de linha.
  return value.trim().replace(/\s+/g, " ");
}

function normalizeEmail(value: string) {
  // Só o domínio é normalizado para minúsculas — é a única parte do
  // endereço que é seguro normalizar (a parte local é, em teoria,
  // sensível a maiúsculas/minúsculas).
  const trimmed = value.trim();
  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex === -1) return trimmed;
  const local = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex + 1).toLowerCase();
  return `${local}@${domain}`;
}

function emptyToUndefined(value: string | undefined) {
  const trimmed = (value ?? "").trim();
  return trimmed.length === 0 ? undefined : trimmed;
}

function normalizeWebsite(value: string | undefined) {
  // Aceita um domínio sem protocolo (ex. "empresa.pt") e assume https —
  // nunca http por omissão. Não efetua nenhum pedido de rede. Se já
  // existir qualquer esquema de URI (http:, ftp:, javascript:, etc.),
  // não mexe — a validação de protocolo a seguir decide se é aceite,
  // em vez de prefixar "https://" por cima de um esquema já presente.
  const trimmed = (value ?? "").trim();
  if (trimmed.length === 0) return undefined;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

const nameField = z
  .string()
  .transform(collapseSpaces)
  .pipe(
    z
      .string()
      .min(2, "Indique o seu nome.")
      .max(80, "O nome não pode ultrapassar 80 caracteres.")
  );

const emailField = z
  .string()
  .transform(normalizeEmail)
  .pipe(
    z
      .string()
      .max(254, "O endereço de email não pode ultrapassar 254 caracteres.")
      .email("Introduza um endereço de email válido.")
  );

const companyField = z
  .string()
  .transform(collapseSpaces)
  .pipe(
    z
      .string()
      .min(2, "Indique o nome da empresa.")
      .max(120, "O nome da empresa não pode ultrapassar 120 caracteres.")
  );

const phoneField = z
  .string()
  .optional()
  .transform(emptyToUndefined)
  .pipe(
    z
      .string()
      .max(30, "O número de telefone não pode ultrapassar 30 caracteres.")
      .optional()
  );

const websiteField = z
  .string()
  .optional()
  .transform(normalizeWebsite)
  .pipe(
    z
      .string()
      .max(2048, "O endereço do website não pode ultrapassar 2048 caracteres.")
      .refine((value) => {
        try {
          const url = new URL(value);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch {
          return false;
        }
      }, "Introduza um endereço de website válido.")
      .optional()
  );

const messageField = z
  .string()
  // Só apara as extremidades — nunca colapsa espaços internos nem
  // quebras de linha, que fazem parte do conteúdo da mensagem.
  .transform((value) => value.trim())
  .pipe(
    z
      .string()
      .min(20, "A mensagem deve ter pelo menos 20 caracteres.")
      .max(3000, "A mensagem não pode ultrapassar 3000 caracteres.")
  );

export const contactMessageSchema = z
  .object({
    name: nameField,
    email: emailField,
    company: companyField,
    phone: phoneField,
    website: websiteField,
    message: messageField,
  })
  .strict();

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

/** Campos visíveis ao utilizador — nunca inclui honeypot/formStartedAt. */
export type ContactFieldName = "name" | "email" | "company" | "phone" | "website" | "message";

const VISIBLE_FIELDS = new Set<ContactFieldName>([
  "name",
  "email",
  "company",
  "phone",
  "website",
  "message",
]);

export type ContactFormFieldErrors = Partial<Record<ContactFieldName, string>>;

/**
 * Converte um ZodError no mapa campo → mensagem usado pela UI. Só inclui
 * campos visíveis ao utilizador (VISIBLE_FIELDS) e mantém apenas a
 * primeira mensagem por campo.
 */
export function toFieldErrors(error: z.ZodError): ContactFormFieldErrors {
  const fieldErrors: ContactFormFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      typeof field === "string" &&
      VISIBLE_FIELDS.has(field as ContactFieldName) &&
      !(field in fieldErrors)
    ) {
      fieldErrors[field as ContactFieldName] = issue.message;
    }
  }
  return fieldErrors;
}

/**
 * Contrato de resultado da futura Server Action. Estável desde já —
 * adicionar o envio real (Resend) não deve exigir alterar esta forma,
 * só preencher os ramos "success"/"technical_error"/"rate_limited" com
 * lógica real. "technical_error" e "config_error" são distinguidos
 * internamente (para logging), mas devem ser apresentados ao utilizador
 * com o mesmo texto genérico — nunca revelar que se trata de um
 * problema de configuração.
 */
export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "validation_error"; fieldErrors: ContactFormFieldErrors }
  | { status: "rate_limited"; message: string }
  | { status: "technical_error"; message: string }
  | { status: "config_error"; message: string };
