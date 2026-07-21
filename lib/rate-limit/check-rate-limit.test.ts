import { afterEach, describe, expect, it, vi } from "vitest";

const { limitMock, RatelimitMock, RedisMock, slidingWindowMock } = vi.hoisted(() => {
  const limitMock = vi.fn();
  const slidingWindowMock = vi.fn(() => "sliding-window-algorithm");

  function RatelimitCtor(this: { limit: typeof limitMock }) {
    this.limit = limitMock;
  }
  const RatelimitMock = Object.assign(vi.fn(RatelimitCtor), { slidingWindow: slidingWindowMock });

  function RedisCtor(this: object) {}
  const RedisMock = vi.fn(RedisCtor);

  return { limitMock, RatelimitMock, RedisMock, slidingWindowMock };
});

vi.mock("@upstash/ratelimit", () => ({ Ratelimit: RatelimitMock }));
vi.mock("@upstash/redis", () => ({ Redis: RedisMock }));

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  vi.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
});

describe("checkRateLimit — configuração em falta (fail-open)", () => {
  it("não bloqueia e não contacta o Upstash quando UPSTASH_REDIS_REST_URL está em falta", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-teste";
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");

    const result = await checkRateLimit("identificador-de-teste");

    expect(result).toEqual({ limited: false });
    expect(RatelimitMock).not.toHaveBeenCalled();
    expect(RedisMock).not.toHaveBeenCalled();
  });

  it("não bloqueia e não contacta o Upstash quando UPSTASH_REDIS_REST_TOKEN está em falta", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");

    const result = await checkRateLimit("identificador-de-teste");

    expect(result).toEqual({ limited: false });
    expect(RatelimitMock).not.toHaveBeenCalled();
  });
});

describe("checkRateLimit — com configuração presente", () => {
  it("devolve limited:false quando o Upstash confirma que está dentro do limite", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-teste";
    limitMock.mockResolvedValue({ success: true });
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");

    const result = await checkRateLimit("identificador-de-teste");

    expect(result).toEqual({ limited: false });
    expect(limitMock).toHaveBeenCalledWith("identificador-de-teste");
  });

  it("devolve limited:true quando o Upstash confirma que o limite foi excedido", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-teste";
    limitMock.mockResolvedValue({ success: false });
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");

    const result = await checkRateLimit("identificador-de-teste");

    expect(result).toEqual({ limited: true });
  });

  it("configura a política em 3 tentativas por janela de 15 minutos", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-teste";
    limitMock.mockResolvedValue({ success: true });
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");

    await checkRateLimit("identificador-de-teste");

    expect(slidingWindowMock).toHaveBeenCalledWith(3, "15 m");
  });

  it("instancia o Redis só com url/token vindos do ambiente", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-teste";
    limitMock.mockResolvedValue({ success: true });
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");

    await checkRateLimit("identificador-de-teste");

    expect(RedisMock).toHaveBeenCalledWith({
      url: "https://example.upstash.io",
      token: "token-de-teste",
    });
  });
});

describe("checkRateLimit — falha do Upstash (fail-open)", () => {
  it("não bloqueia quando a chamada ao Upstash rejeita", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-teste";
    limitMock.mockRejectedValue(new Error("network timeout"));
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");

    const result = await checkRateLimit("identificador-de-teste");

    expect(result).toEqual({ limited: false });
  });

  it("não propaga a exceção nem expõe a sua mensagem", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-teste";
    limitMock.mockRejectedValue(new Error("detalhe interno sensível"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");

    await expect(checkRateLimit("identificador-de-teste")).resolves.toEqual({ limited: false });

    const loggedText = errorSpy.mock.calls.flat().map((v) => JSON.stringify(v)).join(" ");
    expect(loggedText).not.toContain("detalhe interno sensível");
    errorSpy.mockRestore();
  });
});

describe("checkRateLimit — sem PII nos logs", () => {
  it("nunca regista o identificador nos logs", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-de-teste";
    limitMock.mockResolvedValue({ success: false });
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { checkRateLimit } = await import("@/lib/rate-limit/check-rate-limit");

    await checkRateLimit("identificador-super-secreto");

    const loggedText = warnSpy.mock.calls.flat().map((v) => JSON.stringify(v)).join(" ");
    expect(loggedText).not.toContain("identificador-super-secreto");
    warnSpy.mockRestore();
  });
});
