import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-[11px] font-medium uppercase tracking-wider text-faint border border-line rounded px-1.5 py-0.5",
        className
      )}
      {...props}
    />
  );
}
