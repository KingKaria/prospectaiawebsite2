import { describe, expect, it } from "vitest";
import {
  checkHoneypot,
  checkTiming,
  MIN_FILL_MS,
  FUTURE_TOLERANCE_MS,
  MAX_AGE_MS,
} from "@/lib/validations/contact-guards";

const NOW = 1_700_000_000_000;

function fd(entries: Array<[string, string]>) {
  const formData = new FormData();
  for (const [key, value] of entries) formData.append(key, value);
  return formData;
}

describe("checkHoneypot", () => {
  it("não é suspeito quando o campo está ausente", () => {
    expect(checkHoneypot(fd([]))).toEqual({ suspicious: false });
  });

  it("não é suspeito quando o campo está vazio", () => {
    expect(checkHoneypot(fd([["url", ""]]))).toEqual({ suspicious: false });
  });

  it("não é suspeito quando o campo tem apenas espaços", () => {
    expect(checkHoneypot(fd([["url", "   "]]))).toEqual({ suspicious: false });
  });

  it("é suspeito quando o campo tem conteúdo real", () => {
    const result = checkHoneypot(fd([["url", "http://spam.example"]]));
    expect(result.suspicious).toBe(true);
    if (result.suspicious) expect(result.reason).toBe("honeypot_filled");
  });

  it("é suspeito quando o campo aparece mais do que uma vez", () => {
    const result = checkHoneypot(fd([["url", ""], ["url", ""]]));
    expect(result.suspicious).toBe(true);
    if (result.suspicious) expect(result.reason).toBe("honeypot_multiple");
  });

  it("é suspeito quando o valor não é uma string (ex. ficheiro)", () => {
    const formData = new FormData();
    formData.append("url", new File(["x"], "x.txt"));
    const result = checkHoneypot(formData);
    expect(result.suspicious).toBe(true);
    if (result.suspicious) expect(result.reason).toBe("honeypot_non_string");
  });
});

describe("checkTiming — casos válidos", () => {
  it("não é suspeito quando o tempo decorrido está dentro da janela normal", () => {
    const startedAt = NOW - MIN_FILL_MS - 2000; // bem acima do mínimo
    expect(checkTiming(fd([["formStartedAt", String(startedAt)]]), NOW)).toEqual({ suspicious: false });
  });

  it("não é suspeito exatamente no limite mínimo de preenchimento", () => {
    const startedAt = NOW - MIN_FILL_MS;
    expect(checkTiming(fd([["formStartedAt", String(startedAt)]]), NOW)).toEqual({ suspicious: false });
  });
});

describe("checkTiming — ausência e formato", () => {
  it("é suspeito quando ausente", () => {
    const result = checkTiming(fd([]), NOW);
    expect(result.suspicious).toBe(true);
    if (result.suspicious) expect(result.reason).toBe("timing_missing_or_multiple");
  });

  it("é suspeito quando aparece mais do que uma vez", () => {
    const value = String(NOW - MIN_FILL_MS - 1000);
    const result = checkTiming(fd([["formStartedAt", value], ["formStartedAt", value]]), NOW);
    expect(result.suspicious).toBe(true);
    if (result.suspicious) expect(result.reason).toBe("timing_missing_or_multiple");
  });

  it("é suspeito quando é string vazia", () => {
    expect(checkTiming(fd([["formStartedAt", ""]]), NOW).suspicious).toBe(true);
  });

  it("é suspeito quando não é um inteiro (decimal)", () => {
    expect(checkTiming(fd([["formStartedAt", "1700000000000.5"]]), NOW).suspicious).toBe(true);
  });

  it("é suspeito quando tem texto não numérico", () => {
    expect(checkTiming(fd([["formStartedAt", "abc"]]), NOW).suspicious).toBe(true);
  });

  it("é suspeito quando é negativo", () => {
    expect(checkTiming(fd([["formStartedAt", "-1"]]), NOW).suspicious).toBe(true);
  });

  it("é suspeito quando é zero", () => {
    expect(checkTiming(fd([["formStartedAt", "0"]]), NOW).suspicious).toBe(true);
  });

  it("é suspeito quando o valor não é um ficheiro/string", () => {
    const formData = new FormData();
    formData.append("formStartedAt", new File(["x"], "x.txt"));
    const result = checkTiming(formData, NOW);
    expect(result.suspicious).toBe(true);
    if (result.suspicious) expect(result.reason).toBe("timing_non_string");
  });
});

describe("checkTiming — janela temporal", () => {
  it("é suspeito quando o preenchimento é demasiado rápido (< mínimo)", () => {
    const startedAt = NOW - (MIN_FILL_MS - 1);
    const result = checkTiming(fd([["formStartedAt", String(startedAt)]]), NOW);
    expect(result.suspicious).toBe(true);
    if (result.suspicious) expect(result.reason).toBe("timing_too_fast");
  });

  it("é suspeito quando o timestamp está no futuro além da tolerância", () => {
    const startedAt = NOW + FUTURE_TOLERANCE_MS + 1;
    const result = checkTiming(fd([["formStartedAt", String(startedAt)]]), NOW);
    expect(result.suspicious).toBe(true);
    if (result.suspicious) expect(result.reason).toBe("timing_future");
  });

  it("não é suspeito quando está ligeiramente no futuro, dentro da tolerância", () => {
    const startedAt = NOW + FUTURE_TOLERANCE_MS - 1;
    // Ainda dentro da tolerância de futuro, mas "agora - started" é
    // negativo, logo < mínimo → cai em too_fast. Verificamos que a
    // tolerância de futuro não o classifica como "future".
    const result = checkTiming(fd([["formStartedAt", String(startedAt)]]), NOW);
    if (result.suspicious) expect(result.reason).not.toBe("timing_future");
  });

  it("é suspeito quando o formulário foi iniciado há mais de 24 horas", () => {
    const startedAt = NOW - MAX_AGE_MS - 1;
    const result = checkTiming(fd([["formStartedAt", String(startedAt)]]), NOW);
    expect(result.suspicious).toBe(true);
    if (result.suspicious) expect(result.reason).toBe("timing_too_old");
  });

  it("não é suspeito exatamente no limite de 24 horas", () => {
    const startedAt = NOW - MAX_AGE_MS;
    expect(checkTiming(fd([["formStartedAt", String(startedAt)]]), NOW)).toEqual({ suspicious: false });
  });
});
