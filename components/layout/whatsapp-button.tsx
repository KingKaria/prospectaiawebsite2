"use client";

import { usePathname } from "next/navigation";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { whatsappNumber, whatsappMessage } from "@/lib/constants";

// Rotas onde o botão não deve aparecer. Vazio por agora — se uma página
// específica precisar de o ocultar no futuro, basta adicionar o seu path
// aqui (ex.: "/contacto") sem tocar em app/layout.tsx.
const HIDDEN_ON_PATHS: string[] = [];

export function WhatsAppButton() {
  const pathname = usePathname();

  if (HIDDEN_ON_PATHS.includes(pathname)) {
    return null;
  }

  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a ProspectAIA através do WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:scale-105 sm:bottom-6 sm:right-6"
      style={{
        marginBottom: "env(safe-area-inset-bottom)",
        marginRight: "env(safe-area-inset-right)",
      }}
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
