import { cn } from "@/lib/utils";

export type AccordionItemData = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItemData[];
  className?: string;
};

/**
 * Accordion nativo com <details>/<summary> — acessível e sem JavaScript
 * no cliente (funciona por teclado e leitor de ecrã sem custo de bundle).
 */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-border rounded-card border border-border bg-surface", className)}>
      {items.map((item) => (
        <details key={item.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground marker:content-none">
            {item.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-foreground-muted transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
