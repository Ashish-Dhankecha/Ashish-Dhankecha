import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: "h1" | "h2" | "h3" | "h4";
}

const sizeClasses = {
  h1: "text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight",
  h2: "text-xl sm:text-2xl md:text-3xl font-medium tracking-tight leading-snug",
  h3: "text-lg sm:text-xl font-medium tracking-normal leading-snug",
  h4: "text-base sm:text-lg font-medium tracking-normal leading-normal",
};

export function Heading({
  as: Component = "h2",
  size,
  className,
  children,
  ...props
}: HeadingProps) {
  const resolvedSize = size || Component;

  return (
    <Component
      className={cn(
        "font-sans text-text-primary text-balance",
        sizeClasses[resolvedSize],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
