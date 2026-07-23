import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

export type SolutionComparisonRow = {
  aspect: string;
  unstructured: string;
  structured: string;
};

type SolutionComparisonProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  rows: SolutionComparisonRow[];
  unstructuredLabel?: string;
  structuredLabel?: string;
};

export function SolutionComparison({
  eyebrow,
  title,
  description,
  rows,
  unstructuredLabel = "Abordagem desestruturada",
  structuredLabel = "Abordagem organizada",
}: SolutionComparisonProps) {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="overflow-x-auto rounded-card border border-border">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th scope="col" className="p-4 font-medium text-foreground-muted">
                  &nbsp;
                </th>
                <th scope="col" className="p-4 font-medium text-foreground-muted">
                  {unstructuredLabel}
                </th>
                <th scope="col" className="p-4 font-medium text-foreground">
                  {structuredLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.aspect} className="border-b border-border last:border-b-0">
                  <th scope="row" className="p-4 font-medium text-foreground">
                    {row.aspect}
                  </th>
                  <td className="p-4 text-foreground-muted">
                    <span className="flex items-start gap-2">
                      <Icon icon={X} size={16} className="mt-0.5 shrink-0 text-danger" />
                      {row.unstructured}
                    </span>
                  </td>
                  <td className="bg-surface p-4 text-foreground-muted">
                    <span className="flex items-start gap-2">
                      <Icon icon={Check} size={16} className="mt-0.5 shrink-0 text-cyan" />
                      {row.structured}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
