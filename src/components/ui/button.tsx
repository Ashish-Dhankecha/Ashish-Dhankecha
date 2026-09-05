import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

const variantClasses = {
  primary:
    "bg-text-primary text-bg-primary hover:bg-white active:bg-text-primary/90 font-medium shadow-sm",
  secondary:
    "bg-bg-surface text-text-primary hover:bg-bg-elevated hairline-border active:bg-bg-surface font-medium",
  outline:
    "bg-transparent text-text-primary hairline-border hover:bg-bg-surface/50 active:bg-bg-surface font-medium",
  ghost:
    "bg-transparent text-text-muted hover:text-text-primary hover:bg-bg-surface/40 font-medium",
  link:
    "bg-transparent text-text-primary hover:text-accent-primary underline-offset-4 hover:underline p-0 h-auto font-normal",
};

const sizeClasses = {
  sm: "text-xs px-3 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-4 py-2 rounded-md gap-2",
  lg: "text-base px-5 py-2.5 rounded-lg gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary select-none cursor-pointer",
      variant !== "link" && sizeClasses[size],
      variantClasses[variant],
      disabled && "opacity-50 pointer-events-none cursor-not-allowed",
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={baseClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={baseClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
