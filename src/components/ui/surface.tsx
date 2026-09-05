import { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: "flat" | "elevated" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses = {
  flat: "bg-bg-surface hairline-border",
  elevated: "bg-bg-elevated hairline-border shadow-md",
  interactive:
    "bg-bg-surface hairline-border transition-all duration-200 hover:border-border-strong hover:bg-bg-elevated/80 cursor-pointer",
};

const paddingClasses = {
  none: "p-0",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-7",
  lg: "p-8 sm:p-10",
};

export function Surface({
  as: Component = "div",
  variant = "flat",
  padding = "md",
  className,
  children,
  ...props
}: SurfaceProps) {
  return (
    <Component
      className={cn(
        "rounded-lg overflow-hidden",
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
