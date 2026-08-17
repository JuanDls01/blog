import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-[scale,opacity] duration-150 ease-out-strong active:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-fg text-bg hover:opacity-85",
      },
      size: {
        default: "text-sm px-3.5 py-2",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  className?: string;
  children?: React.ReactNode;
};

type ButtonProps = ButtonOwnProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonOwnProps
  >;

// Renders an <a> when href is given, a <button> otherwise — one component,
// one visual style, for both navigational and action CTAs.
export function Button({ href, variant, size, className, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
