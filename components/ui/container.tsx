import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article";
};

export function Container({
  as: Tag = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  const Component = Tag as "div";

  return (
    <Component
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
