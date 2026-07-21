import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export type RateLimitVerdict = { limited: true } | { limited: false };

const MAX_ATTEMPTS = 3;
const WINDOW = "15 m";

/**
 * Verifica o limite de frequência num identificador pseudónimo já
 * derivado (nunca um IP em bruto). Fail-open: se o Upstash não estiver
 * configurado ou estiver indisponível, a proteção fica degradada mas a
 * submissão nunca é bloqueada por isso — só regista um aviso técnico, sem
 * dados pessoais.
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitVerdict> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn("[contact] rate limiting degradado", { reason: "missing_config" });
    return { limited: false };
  }

  try {
    const redis = new Redis({ url, token });
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_ATTEMPTS, WINDOW),
      prefix: "contact-form",
    });

    const result = await ratelimit.limit(identifier);
    return result.success ? { limited: false } : { limited: true };
  } catch (error) {
    console.error("[contact] rate limiting degradado", {
      reason: "upstash_error",
      errorName: error instanceof Error ? error.name : "erro desconhecido",
    });
    return { limited: false };
  }
}
