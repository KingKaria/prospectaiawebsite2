import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li";
};

export function Card({ as: Tag = "div", className, children, ...props }: CardProps) {
  const Component = Tag as "div";

  return (
    <Component
      className={cn(
        "rounded-card border border-border bg-surface p-6",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
