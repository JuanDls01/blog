import { cn } from "@/lib/utils";

export function PageTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-[19px] font-semibold tracking-[-0.01em]", className)} {...props} />
  );
}
