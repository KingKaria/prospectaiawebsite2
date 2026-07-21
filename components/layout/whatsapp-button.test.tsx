import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("WhatsAppButton", () => {
  it("renderiza um link com href, aria-label e atributos de segurança corretos", async () => {
    const { WhatsAppButton } = await import("@/components/layout/whatsapp-button");
    const html = renderToStaticMarkup(<WhatsAppButton />);

    expect(html).toContain('href="https://wa.me/351937158315?text=');
    expect(html).toContain('aria-label="Contactar a ProspectAIA através do WhatsApp"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("tem uma área de toque de pelo menos 44px (h-14 = 56px)", async () => {
    const { WhatsAppButton } = await import("@/components/layout/whatsapp-button");
    const html = renderToStaticMarkup(<WhatsAppButton />);

    expect(html).toContain("h-14");
    expect(html).toContain("w-14");
  });
});
