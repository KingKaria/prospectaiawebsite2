import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { deriveRateLimitIdentifier, extractClientIp } from "@/lib/rate-limit/derive-identifier";

describe("deriveRateLimitIdentifier", () => {
  it("não está disponível quando o segredo está em falta", () => {
    const result = deriveRateLimitIdentifier("203.0.113.10", undefined);
    expect(result).toEqual({ available: false, reason: "missing_secret" });
  });

  it("não está disponível quando o IP está em falta", () => {
    const result = deriveRateLimitIdentifier(null, "segredo-de-teste");
    expect(result).toEqual({ available: false, reason: "missing_ip" });
  });

  it("produz sempre o mesmo identificador para o mesmo IP e segredo", () => {
    const a = deriveRateLimitIdentifier("203.0.113.10", "segredo-de-teste");
    const b = deriveRateLimitIdentifier("203.0.113.10", "segredo-de-teste");
    expect(a).toEqual(b);
  });

  it("produz identificadores diferentes para IPs diferentes", () => {
    const a = deriveRateLimitIdentifier("203.0.113.10", "segredo-de-teste");
    const b = deriveRateLimitIdentifier("203.0.113.11", "segredo-de-teste");
    expect(a).not.toEqual(b);
  });

  it("produz identificadores diferentes para segredos diferentes com o mesmo IP", () => {
    const a = deriveRateLimitIdentifier("203.0.113.10", "segredo-um");
    const b = deriveRateLimitIdentifier("203.0.113.10", "segredo-dois");
    expect(a).not.toEqual(b);
  });

  it("o identificador é o HMAC-SHA-256 esperado (não é o IP nem um SHA-256 simples)", () => {
    const ip = "203.0.113.10";
    const secret = "segredo-de-teste";
    const result = deriveRateLimitIdentifier(ip, secret);

    expect(result.available).toBe(true);
    if (!result.available) return;

    const expected = createHmac("sha256", secret).update(ip).digest("hex");
    expect(result.identifier).toBe(expected);
    expect(result.identifier).not.toContain(ip);
  });
});

describe("extractClientIp", () => {
  it("devolve null quando não há cabeçalhos de IP", () => {
    expect(extractClientIp(new Headers())).toBeNull();
  });

  it("lê o IP de x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.10" });
    expect(extractClientIp(headers)).toBe("203.0.113.10");
  });

  it("usa apenas a primeira entrada de uma cadeia x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.10, 198.51.100.1, 192.0.2.1" });
    expect(extractClientIp(headers)).toBe("203.0.113.10");
  });

  it("apara espaços à volta da primeira entrada", () => {
    const headers = new Headers({ "x-forwarded-for": "  203.0.113.10  , 198.51.100.1" });
    expect(extractClientIp(headers)).toBe("203.0.113.10");
  });

  it("recorre a x-real-ip quando x-forwarded-for está ausente", () => {
    const headers = new Headers({ "x-real-ip": "203.0.113.20" });
    expect(extractClientIp(headers)).toBe("203.0.113.20");
  });

  it("prefere x-forwarded-for a x-real-ip quando ambos estão presentes", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.10",
      "x-real-ip": "203.0.113.20",
    });
    expect(extractClientIp(headers)).toBe("203.0.113.10");
  });
});
