import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: LegalSection[];
};

/**
 * Layout partilhado pelas 3 páginas legais (Privacidade, Termos, Cookies):
 * cabeçalho com aviso de estado + índice navegável (fixo em desktop,
 * colapsável em mobile) + secções com âncoras internas. Cada página só
 * fornece os dados — o layout garante consistência entre as três.
 */
export function LegalDocument({ title, lastUpdated, intro, sections }: LegalDocumentProps) {
  return (
    <Container className="flex flex-col gap-10 py-20">
      <div className="flex flex-col gap-4">
        <Badge variant="outline">Modelo pendente de revisão jurídica</Badge>
        <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="text-sm text-foreground-subtle">Última atualização: {lastUpdated}</p>
        <div className="flex max-w-3xl flex-col gap-3 text-base leading-relaxed text-foreground-muted">
          {intro}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:items-start lg:gap-12">
        <details className="group mb-10 rounded-card border border-border bg-surface p-4 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-medium text-foreground marker:content-none">
            Índice
            <span
              aria-hidden="true"
              className="shrink-0 text-foreground-muted transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="mt-3">
            <TocList sections={sections} />
          </div>
        </details>

        <nav aria-label="Índice do documento" className="hidden lg:sticky lg:top-24 lg:block">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-foreground-subtle">
            Índice
          </p>
          <TocList sections={sections} />
        </nav>

        <div className="flex flex-col gap-12 lg:max-w-3xl">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-medium text-foreground">{section.title}</h2>
              <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-foreground-muted">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}

function TocList({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className="flex flex-col gap-1 text-sm">
      {sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-foreground-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            <span className="font-mono text-xs text-foreground-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}
