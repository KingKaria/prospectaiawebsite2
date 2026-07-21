import { createHmac } from "node:crypto";

export type DeriveIdentifierResult =
  | { available: true; identifier: string }
  | { available: false; reason: "missing_secret" | "missing_ip" };

/**
 * Deriva um identificador pseudónimo e estável a partir do IP do
 * remetente, usando HMAC-SHA-256 com um segredo que vive só no servidor.
 * O mesmo IP com o mesmo segredo produz sempre o mesmo identificador; sem
 * o segredo é computacionalmente inviável recuperar o IP a partir dele.
 * Nunca guarda nem devolve o IP em texto simples.
 */
export function deriveRateLimitIdentifier(
  ip: string | null,
  secret: string | undefined
): DeriveIdentifierResult {
  if (!secret) return { available: false, reason: "missing_secret" };
  if (!ip) return { available: false, reason: "missing_ip" };

  const identifier = createHmac("sha256", secret).update(ip).digest("hex");
  return { available: true, identifier };
}

/**
 * Extrai o IP do remetente dos cabeçalhos do pedido. x-forwarded-for pode
 * conter uma cadeia "cliente, proxy1, proxy2" — usamos a primeira entrada.
 * Sem proxy/CDN de confiança configurado este valor pode ser forjado pelo
 * próprio cliente; aceitável nesta fase, que trata de abuso, não de
 * autenticação.
 */
export function extractClientIp(headerList: Headers): string | null {
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = headerList.get("x-real-ip");
  return realIp ? realIp.trim() : null;
}
