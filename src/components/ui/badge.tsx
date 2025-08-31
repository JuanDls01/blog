import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-lg hover:bg-primary/80 hover:shadow-xl",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/80 hover:shadow-xl",
        outline: 
          "text-neutral-300 border-neutral-600/50 bg-neutral-800/30 hover:bg-neutral-700/50 hover:border-neutral-500/70 hover:text-neutral-100 backdrop-blur-sm shadow-md hover:shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(
        badgeVariants({ variant }), 
        "relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10 before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100",
        className
      )} 
      {...props} 
    />
  );
}

export { Badge, badgeVariants };
