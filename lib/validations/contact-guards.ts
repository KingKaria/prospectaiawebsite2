/**
 * Portas anti-spam do formulário de contacto — honeypot e janela
 * temporal. Recebem o FormData bruto (não os dados já validados), para
 * poderem detetar campos repetidos e valores que não são strings. Não
 * tocam em nenhum dado pessoal e nunca registam valores — só devolvem um
 * veredito com um código técnico de motivo.
 *
 * O comportamento perante uma submissão suspeita (sucesso aparente, sem
 * chamar o adaptador) é decidido pela Server Action, não aqui — estas
 * funções apenas classificam.
 */

/** Tempo mínimo de preenchimento plausível para um humano. */
export const MIN_FILL_MS = 3000;
/** Tolerância para timestamps ligeiramente no futuro (desvio de relógio). */
export const FUTURE_TOLERANCE_MS = 5000;
/** Idade máxima de um formulário iniciado (reduz reutilização de payloads). */
export const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export type GuardVerdict = { suspicious: false } | { suspicious: true; reason: string };

/**
 * Deteta o preenchimento do campo-armadilha (name="url" no HTML,
 * invisível para humanos). Suspeito quando aparece mais do que uma vez,
 * quando não é uma string, ou quando tem conteúdo depois de trim().
 * O campo ausente ou vazio é o estado normal de um humano.
 */
export function checkHoneypot(formData: FormData): GuardVerdict {
  const values = formData.getAll("url");

  if (values.length > 1) return { suspicious: true, reason: "honeypot_multiple" };
  if (values.length === 0) return { suspicious: false };

  const value = values[0];
  if (typeof value !== "string") return { suspicious: true, reason: "honeypot_non_string" };
  if (value.trim().length > 0) return { suspicious: true, reason: "honeypot_filled" };

  return { suspicious: false };
}

/**
 * Valida a janela temporal a partir de formStartedAt (epoch ms criado no
 * browser quando o formulário foi apresentado). Não existe fallback: um
 * valor ausente, repetido, mal formado ou fora da janela plausível é
 * tratado como suspeito, para que a proteção não possa ser neutralizada
 * simplesmente por omitir o campo.
 */
export function checkTiming(formData: FormData, now: number = Date.now()): GuardVerdict {
  const values = formData.getAll("formStartedAt");

  if (values.length !== 1) return { suspicious: true, reason: "timing_missing_or_multiple" };

  const raw = values[0];
  if (typeof raw !== "string") return { suspicious: true, reason: "timing_non_string" };

  const trimmed = raw.trim();
  // Apenas dígitos — rejeita vazio, sinais, decimais, notação científica,
  // espaços e qualquer coisa que não seja um inteiro positivo em texto.
  if (!/^\d+$/.test(trimmed)) return { suspicious: true, reason: "timing_not_integer" };

  const startedAt = Number(trimmed);
  // Rejeita valores fora do intervalo de inteiro seguro (implausíveis)
  // e zero (o regex já exclui negativos).
  if (!Number.isSafeInteger(startedAt) || startedAt <= 0) {
    return { suspicious: true, reason: "timing_invalid" };
  }

  if (startedAt > now + FUTURE_TOLERANCE_MS) return { suspicious: true, reason: "timing_future" };
  if (now - startedAt > MAX_AGE_MS) return { suspicious: true, reason: "timing_too_old" };
  if (now - startedAt < MIN_FILL_MS) return { suspicious: true, reason: "timing_too_fast" };

  return { suspicious: false };
}
