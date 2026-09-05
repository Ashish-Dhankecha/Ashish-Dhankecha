import { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  underline?: boolean;
  showIcon?: boolean;
}

export function TextLink({
  href,
  external,
  underline = true,
  showIcon = false,
  className,
  children,
  ...props
}: TextLinkProps) {
  const isExternal = external ?? href.startsWith("http");

  const classes = cn(
    "inline-flex items-center gap-1 font-medium text-text-primary hover:text-accent-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-sm",
    underline && "underline decoration-border-strong underline-offset-4 hover:decoration-accent-primary",
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        <span>{children}</span>
        {showIcon && (
          <ArrowUpRight
            className="w-3.5 h-3.5 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        )}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      <span>{children}</span>
      {showIcon && (
        <ArrowUpRight
          className="w-3.5 h-3.5 shrink-0 opacity-70"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
