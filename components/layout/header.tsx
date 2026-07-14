import NextLink from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { mainNav } from "@/lib/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <NextLink href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-xs">
          <Logo />
        </NextLink>

        <nav aria-label="Navegação principal" className="hidden md:flex md:items-center md:gap-8">
          {mainNav.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-xs"
            >
              {item.label}
            </NextLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contacto" size="sm">
            Pedir contacto
          </Button>
        </div>

        <MobileNavigation />
      </Container>
    </header>
  );
}
