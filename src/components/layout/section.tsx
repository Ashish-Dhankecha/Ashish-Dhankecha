import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
  divider?: boolean;
}

const spacingClasses = {
  none: "py-0",
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 md:py-20",
  lg: "py-16 sm:py-24 md:py-32",
  xl: "py-24 sm:py-32 md:py-40",
};

export function Section({
  spacing = "md",
  divider = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full",
        spacingClasses[spacing],
        divider && "hairline-border-b",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
