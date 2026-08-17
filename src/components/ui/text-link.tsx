import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const isExternal = (href: string) => /^https?:\/\//.test(href);

const variants = {
  // Inline links inside body copy: same weight as surrounding text.
  default:
    "text-fg underline decoration-faint underline-offset-[3px] hover:decoration-fg transition-colors duration-150",
  // Secondary/navigational links: smaller, muted until hovered.
  quiet:
    "text-[13.5px] text-muted underline decoration-line underline-offset-[3px] hover:text-fg hover:decoration-fg transition-colors duration-150",
};

interface TextLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: keyof typeof variants;
}

export function TextLink({ href, variant = "default", className, children, ...props }: TextLinkProps) {
  const classes = cn(variants[variant], className);

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
