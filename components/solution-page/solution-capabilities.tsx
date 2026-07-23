import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

export type SolutionCapability = {
  icon: LucideIcon;
  title: string;
  description: string;
  advantage: string;
};

type SolutionCapabilitiesProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  capabilities: SolutionCapability[];
};

export function SolutionCapabilities({
  eyebrow,
  title,
  description,
  capabilities,
}: SolutionCapabilitiesProps) {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container className="flex flex-col gap-8">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className="grid gap-4 rounded-card border border-border bg-surface p-6 sm:grid-cols-[auto_1fr]"
            >
              <Icon icon={capability.icon} size={24} className="text-violet-accent" />
              <div>
                <h3 className="text-base font-medium text-foreground">{capability.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {capability.description}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cyan">{capability.advantage}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
