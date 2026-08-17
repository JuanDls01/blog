import { cn } from "@/lib/utils";

interface MetaTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "span" | "p" | "div" | "time";
  nowrap?: boolean;
  dateTime?: string;
}

export function MetaText({ as: Tag = "span", nowrap, className, ...props }: MetaTextProps) {
  return (
    <Tag
      className={cn(
        "text-[13px] text-faint tabular-nums",
        nowrap && "whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}
