import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export function Textarea({ id, label, hint, className, rows = 5, ...props }: TextareaProps) {
  const hintId = hint && id ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        rows={rows}
        aria-describedby={hintId}
        className={cn(
          "resize-y rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:border-cyan",
          className
        )}
        {...props}
      />
      {hint ? (
        <p id={hintId} className="text-xs text-foreground-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
