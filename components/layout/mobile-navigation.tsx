"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import NextLink from "next/link";
import { mainNav } from "@/lib/navigation";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Fecha o painel quando a rota muda, sem usar setState dentro de um efeito
  // (ajuste de estado durante a renderização — ver docs do React).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        <Icon icon={open ? X : Menu} size={22} />
      </button>

      <div
        id="mobile-nav-panel"
        style={{
          maxHeight: open ? "70vh" : "0px",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        className="fixed inset-x-0 top-16 z-40 overflow-hidden border-b border-border bg-background px-5 pb-6 pt-2 transition-[max-height,opacity] duration-200 ease-out"
      >
        <nav aria-label="Navegação principal (telemóvel)" className="flex flex-col gap-1">
          {mainNav.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              {item.label}
            </NextLink>
          ))}
        </nav>
        <Button href="/contacto" className="mt-4 w-full">
          Pedir contacto
        </Button>
      </div>
    </div>
  );
}
