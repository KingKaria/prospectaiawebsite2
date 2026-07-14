import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { Link } from "@/components/ui/link";
import { mainNav, footerLegalNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Navegação</p>
          <ul className="mt-4 flex flex-col gap-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-foreground-muted hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Contacto</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-foreground-muted">
            <li>
              <Link href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</Link>
            </li>
            <li>{siteConfig.contactPhone}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Legal</p>
          <ul className="mt-4 flex flex-col gap-3">
            {footerLegalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-foreground-muted hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-foreground-subtle sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p>{siteConfig.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
