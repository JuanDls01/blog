import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kickerVariants = cva("uppercase text-faint", {
  variants: {
    size: {
      sm: "text-[13px] font-medium tracking-[0.05em]",
      xs: "text-[11px] font-semibold tracking-[0.08em]",
    },
  },
  defaultVariants: { size: "sm" },
});

interface KickerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kickerVariants> {
  as?: "h2" | "p" | "span";
}

export function Kicker({ as: Tag = "h2", size, className, ...props }: KickerProps) {
  return <Tag className={cn(kickerVariants({ size }), className)} {...props} />;
}
